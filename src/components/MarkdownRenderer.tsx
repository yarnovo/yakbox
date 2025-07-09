import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Components } from 'react-markdown';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className }) => {
  const components: Components = {
    p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
    h1: ({ children }) => <h1 className="text-2xl font-bold mb-4 mt-6 first:mt-0">{children}</h1>,
    h2: ({ children }) => <h2 className="text-xl font-bold mb-3 mt-5 first:mt-0">{children}</h2>,
    h3: ({ children }) => <h3 className="text-lg font-bold mb-2 mt-4 first:mt-0">{children}</h3>,
    h4: ({ children }) => <h4 className="text-base font-bold mb-2 mt-3 first:mt-0">{children}</h4>,
    h5: ({ children }) => <h5 className="text-sm font-bold mb-1 mt-2 first:mt-0">{children}</h5>,
    h6: ({ children }) => <h6 className="text-xs font-bold mb-1 mt-2 first:mt-0">{children}</h6>,
    ul: ({ children }) => <ul className="list-disc list-inside mb-2">{children}</ul>,
    ol: ({ children }) => <ol className="list-decimal list-inside mb-2">{children}</ol>,
    li: ({ children }) => <li className="mb-1">{children}</li>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 italic my-2">{children}</blockquote>
    ),
    code: ({ className, children }) => {
      const isInline = !className;
      return isInline ? (
        <code className="bg-gray-100 rounded px-1 py-0.5 text-sm font-mono">{children}</code>
      ) : (
        <code className="block bg-gray-100 rounded p-3 my-2 text-sm font-mono overflow-x-auto">
          {children}
        </code>
      );
    },
    pre: ({ children }) => <pre className="my-2">{children}</pre>,
    a: ({ href, children }) => (
      <a
        href={href}
        className="text-blue-600 hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
    hr: () => <hr className="my-4 border-t border-gray-300" />,
    table: ({ children }) => (
      <div className="overflow-x-auto my-2">
        <table className="min-w-full border-collapse">{children}</table>
      </div>
    ),
    thead: ({ children }) => <thead className="bg-gray-50">{children}</thead>,
    tbody: ({ children }) => <tbody>{children}</tbody>,
    tr: ({ children }) => <tr className="border-b">{children}</tr>,
    th: ({ children }) => <th className="px-4 py-2 text-left font-medium">{children}</th>,
    td: ({ children }) => <td className="px-4 py-2">{children}</td>,
    img: ({ src, alt }) => <img src={src} alt={alt} className="max-w-full h-auto rounded my-2" />,
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    del: ({ children }) => <del className="line-through">{children}</del>,
  };

  return (
    <div className={className}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
