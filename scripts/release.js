#!/usr/bin/env node

import { execSync } from 'child_process';
import { readFileSync } from 'fs';
import prompts from 'prompts';
import chalk from 'chalk';

// 执行命令并返回结果
function exec(command, silent = false) {
  try {
    const result = execSync(command, { encoding: 'utf8' });
    if (!silent) console.log(result.trim());
    return result.trim();
  } catch (error) {
    console.error(chalk.red(`❌ 命令执行失败: ${command}`));
    console.error(error.message);
    process.exit(1);
  }
}

// 获取当前版本
function getCurrentVersion() {
  const packageJson = JSON.parse(readFileSync('./package.json', 'utf8'));
  return packageJson.version;
}

// 获取当前分支
function getCurrentBranch() {
  return exec('git branch --show-current', true);
}

// 检查工作区是否干净
function checkGitStatus() {
  const status = exec('git status --porcelain', true);
  if (status) {
    console.log(chalk.yellow('⚠️  工作区有未提交的更改:'));
    console.log(status);
    return false;
  }
  return true;
}

// 计算下一个版本号
function getNextVersion(currentVersion, releaseType, isPrerelease, prereleaseType) {
  // 匹配版本号格式，支持 alpha, beta, rc
  const versionMatch = currentVersion.match(/^(\d+)\.(\d+)\.(\d+)(-((alpha|beta|rc)\.(\d+)))?$/);
  if (!versionMatch) {
    throw new Error('无效的版本号格式');
  }

  const [, major, minor, patch, , , currentPrereleaseType, prereleaseNum] = versionMatch;
  let newVersion;

  // 如果当前是预发布版本
  if (currentPrereleaseType) {
    if (isPrerelease) {
      if (prereleaseType === currentPrereleaseType) {
        // 相同类型: 递增版本号
        newVersion = `${major}.${minor}.${patch}-${currentPrereleaseType}.${parseInt(prereleaseNum) + 1}`;
      } else {
        // 不同类型: 检查升级路径
        const prereleaseOrder = ['alpha', 'beta', 'rc'];
        const currentIndex = prereleaseOrder.indexOf(currentPrereleaseType);
        const newIndex = prereleaseOrder.indexOf(prereleaseType);
        
        if (newIndex > currentIndex) {
          // 升级预发布类型 (alpha -> beta -> rc)
          newVersion = `${major}.${minor}.${patch}-${prereleaseType}.0`;
        } else {
          console.log(chalk.yellow(`\n⚠️  警告: 从 ${currentPrereleaseType} 切换到 ${prereleaseType} 是降级操作`));
          newVersion = `${major}.${minor}.${patch}-${prereleaseType}.0`;
        }
      }
    } else {
      // 预发布 -> 正式版: 去掉预发布后缀
      newVersion = `${major}.${minor}.${patch}`;
    }
  } else {
    // 当前是正式版本
    const majorNum = parseInt(major);
    const minorNum = parseInt(minor);
    const patchNum = parseInt(patch);

    switch (releaseType) {
      case 'major':
        newVersion = `${majorNum + 1}.0.0`;
        break;
      case 'minor':
        newVersion = `${majorNum}.${minorNum + 1}.0`;
        break;
      case 'patch':
        newVersion = `${majorNum}.${minorNum}.${patchNum + 1}`;
        break;
    }

    if (isPrerelease) {
      newVersion += `-${prereleaseType}.0`;
    }
  }

  return newVersion;
}

async function main() {
  console.log(chalk.blue.bold('\n🚀 发布脚本\n'));

  // 检查当前状态
  const currentVersion = getCurrentVersion();
  const currentBranch = getCurrentBranch();
  
  console.log(chalk.cyan(`📦 当前版本: ${currentVersion}`));
  console.log(chalk.cyan(`🌿 当前分支: ${currentBranch}`));
  console.log();

  // 检查工作区
  const isDirty = !checkGitStatus();
  if (isDirty) {
    const { proceed } = await prompts({
      type: 'confirm',
      name: 'proceed',
      message: '工作区有未提交的更改，是否继续？',
      initial: false
    });
    
    if (!proceed) {
      console.log(chalk.red('✖ 发布已取消'));
      process.exit(0);
    }
  }

  // 检查当前是否是预发布版本
  const prereleaseMatch = currentVersion.match(/-(alpha|beta|rc)\./);
  const currentPrereleaseType = prereleaseMatch ? prereleaseMatch[1] : null;

  // 构建发布类型选项
  const releaseTypeChoices = [
    { title: '正式版本 (Production)', value: 'production', description: '稳定版本，供生产环境使用' }
  ];

  if (!currentPrereleaseType || currentPrereleaseType === 'alpha') {
    releaseTypeChoices.push({ 
      title: 'Alpha 版本', 
      value: 'alpha', 
      description: '内部测试版本，功能可能不完整' 
    });
  }
  
  if (!currentPrereleaseType || currentPrereleaseType === 'alpha' || currentPrereleaseType === 'beta') {
    releaseTypeChoices.push({ 
      title: 'Beta 版本', 
      value: 'beta', 
      description: '公开测试版本，功能基本完整' 
    });
  }
  
  if (!currentPrereleaseType || currentPrereleaseType === 'beta' || currentPrereleaseType === 'rc') {
    releaseTypeChoices.push({ 
      title: 'RC 版本', 
      value: 'rc', 
      description: '候选发布版本，即将成为正式版' 
    });
  }

  // 选择发布类型
  const { releaseTypeChoice } = await prompts({
    type: 'select',
    name: 'releaseTypeChoice',
    message: '选择发布类型',
    choices: releaseTypeChoices,
    initial: 0
  });

  if (!releaseTypeChoice) {
    console.log(chalk.red('✖ 发布已取消'));
    process.exit(0);
  }

  const isPrerelease = releaseTypeChoice !== 'production';
  const prereleaseType = isPrerelease ? releaseTypeChoice : null;

  // 选择版本号类型
  let versionBump = 'patch';
  
  if (currentPrereleaseType) {
    // 当前是预发布版本
    if (isPrerelease && prereleaseType === currentPrereleaseType) {
      console.log(chalk.yellow(`\n当前是 ${currentPrereleaseType} 版本，将自动递增版本号`));
    } else if (isPrerelease) {
      const prereleaseNames = { alpha: 'Alpha', beta: 'Beta', rc: 'RC' };
      console.log(chalk.yellow(`\n当前是 ${prereleaseNames[currentPrereleaseType]} 版本，将切换到 ${prereleaseNames[prereleaseType]} 版本`));
    } else {
      console.log(chalk.yellow(`\n当前是 ${currentPrereleaseType} 版本，将发布为正式版本`));
    }
  } else if (isPrerelease || releaseTypeChoice === 'production') {
    // 需要选择版本递增类型
    const [major, minor, patch] = currentVersion.split('.').map(Number);
    
    const prereleaseSuffix = isPrerelease ? `-${prereleaseType}.0` : '';
    
    const { selectedVersionBump } = await prompts({
      type: 'select',
      name: 'selectedVersionBump',
      message: '选择版本号迭代类型',
      choices: [
        { 
          title: 'Patch (修订号)', 
          value: 'patch', 
          description: `错误修复 (${currentVersion} → ${major}.${minor}.${patch + 1}${prereleaseSuffix})` 
        },
        { 
          title: 'Minor (次版本号)', 
          value: 'minor', 
          description: `新功能，向后兼容 (${currentVersion} → ${major}.${minor + 1}.0${prereleaseSuffix})` 
        },
        { 
          title: 'Major (主版本号)', 
          value: 'major', 
          description: `重大更新，可能不兼容 (${currentVersion} → ${major + 1}.0.0${prereleaseSuffix})` 
        }
      ],
      initial: 0
    });

    if (!selectedVersionBump) {
      console.log(chalk.red('✖ 发布已取消'));
      process.exit(0);
    }

    versionBump = selectedVersionBump;
  }

  // 计算新版本号
  const newVersion = getNextVersion(currentVersion, versionBump, isPrerelease, prereleaseType);
  const tagName = `v${newVersion}`;

  // 显示执行计划
  console.log(chalk.blue.bold('\n📋 执行计划:\n'));
  console.log(chalk.white(`  当前版本: ${currentVersion} → 新版本: ${newVersion}`));
  console.log(chalk.white(`  标签名称: ${tagName}`));
  
  let releaseTypeName = '正式版本';
  if (isPrerelease) {
    const prereleaseNames = { 
      alpha: 'Alpha (内部测试)', 
      beta: 'Beta (公开测试)', 
      rc: 'RC (候选发布)' 
    };
    releaseTypeName = prereleaseNames[prereleaseType];
  }
  console.log(chalk.white(`  发布类型: ${releaseTypeName}`));
  
  console.log(chalk.blue.bold('\n📝 执行步骤:\n'));
  const steps = [
    '运行 lint 检查 (npm run lint)',
    '运行类型检查 (npm run typecheck)',
    '运行测试 (npm test)',
    '构建项目 (npm run build)',
    `更新版本号到 ${newVersion}`,
    `提交版本更新 (commit message: "chore: release ${newVersion}")`,
    `创建 Git 标签 ${tagName}`,
    '推送提交和标签到远程仓库 (git push --follow-tags)'
  ];

  steps.forEach((step, index) => {
    console.log(`  ${index + 1}. ${step}`);
  });
  
  console.log(chalk.gray('\n  提交信息预览: "chore: release ' + newVersion + '"'));

  // 确认执行
  const { confirm } = await prompts({
    type: 'confirm',
    name: 'confirm',
    message: '确认执行以上步骤？',
    initial: true
  });

  if (!confirm) {
    console.log(chalk.red('✖ 发布已取消'));
    process.exit(0);
  }

  // 执行发布流程
  console.log(chalk.green.bold('\n🏃 开始执行发布流程...\n'));

  try {
    // 1. Lint 检查
    console.log(chalk.cyan('📝 运行 lint 检查...'));
    exec('npm run lint');

    // 2. 类型检查
    console.log(chalk.cyan('\n📐 运行类型检查...'));
    exec('npm run typecheck');

    // 3. 测试
    console.log(chalk.cyan('\n🧪 运行测试...'));
    exec('npm test');

    // 4. 构建
    console.log(chalk.cyan('\n🔨 构建项目...'));
    exec('npm run build');

    // 5. 更新版本号
    console.log(chalk.cyan(`\n📦 更新版本号到 ${newVersion}...`));
    exec(`npm version ${newVersion} --no-git-tag-version`);

    // 6. 提交更改
    console.log(chalk.cyan('\n💾 提交版本更新...'));
    exec('git add package.json package-lock.json');
    exec(`git commit -m "chore: release ${newVersion}"`);

    // 7. 创建标签
    console.log(chalk.cyan(`\n🏷️  创建标签 ${tagName}...`));
    exec(`git tag -a ${tagName} -m "Release ${newVersion}"`);

    // 8. 推送提交和标签
    console.log(chalk.cyan('\n📤 推送提交和标签到远程仓库...'));
    exec('git push --follow-tags');

    console.log(chalk.green.bold('\n✅ 发布成功！\n'));
    console.log(chalk.white(`版本 ${newVersion} 已创建并推送到远程仓库`));
    
    // 显示如何安装新版本
    console.log(chalk.blue.bold('\n📦 安装方式:'));
    if (isPrerelease) {
      console.log(chalk.white(`  npm install chat-window@${prereleaseType}`));
      console.log(chalk.white(`  npm install chat-window@${newVersion}`));
    } else {
      console.log(chalk.white(`  npm install chat-window`));
      console.log(chalk.white(`  npm install chat-window@${newVersion}`));
    }
    
    console.log(chalk.blue.bold('\n🔗 相关链接:'));
    console.log(chalk.white('  GitHub Actions: https://github.com/[your-repo]/actions'));
    console.log(chalk.white('  NPM Package: https://www.npmjs.com/package/chat-window'));

  } catch (error) {
    console.error(chalk.red('\n❌ 发布过程中出现错误'));
    console.error(error);
    process.exit(1);
  }
}

// 处理 Ctrl+C
prompts.override(process.argv);

// 处理未捕获的错误
process.on('unhandledRejection', (error) => {
  console.error(chalk.red('未处理的错误:'), error);
  process.exit(1);
});

main().catch(console.error);