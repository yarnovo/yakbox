#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 读取 package.json 获取当前版本
const packageJsonPath = join(__dirname, '..', 'package.json');
const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
const currentVersion = packageJson.version;

// 读取 CHANGELOG.md
const changelogPath = join(__dirname, '..', 'CHANGELOG.md');
let changelog = readFileSync(changelogPath, 'utf-8');

// 找到 ## [Unreleased] 并在后面插入新版本号
const unreleasedRegex = /## \[Unreleased\]/;
const match = changelog.match(unreleasedRegex);

if (match) {
  // 在 [Unreleased] 后面插入新版本标题
  changelog = changelog.replace(
    unreleasedRegex,
    `## [Unreleased]\n\n## [${currentVersion}]`
  );
  
  // 写回文件
  writeFileSync(changelogPath, changelog, 'utf-8');
  
  console.log(`✅ CHANGELOG.md 已更新，在 [Unreleased] 后添加了 [${currentVersion}]`);
} else {
  console.log('ℹ️  未找到 [Unreleased] 部分，无法更新');
}