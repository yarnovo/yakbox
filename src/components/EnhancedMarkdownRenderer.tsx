import React, { useMemo } from 'react';
import MarkdownRenderer from './MarkdownRenderer';
import ReasoningBlock from './ReasoningBlock';

interface EnhancedMarkdownRendererProps {
  content: string;
  className?: string;
}

interface ParsedElement {
  type: 'text' | 'xml';
  content: string;
  component?: string;
  props?: Record<string, string>;
}

const EnhancedMarkdownRenderer: React.FC<EnhancedMarkdownRendererProps> = ({
  content,
  className,
}) => {
  const parsedElements = useMemo(() => {
    const elements: ParsedElement[] = [];
    const lines = content.split('\n');
    let i = 0;

    while (i < lines.length) {
      const line = lines[i];

      // Check if line starts with < at the beginning (XML tag)
      if (line.trim().startsWith('<') && !line.trim().startsWith('</')) {
        // Try to find the closing tag
        const tagMatch = line.match(/^<(\w+)(?:\s+([^>]+))?>/);
        if (tagMatch) {
          const tagName = tagMatch[1];
          const attributesStr = tagMatch[2];
          const closingTag = `</${tagName}>`;

          // Parse attributes
          const props: Record<string, string> = {};
          if (attributesStr) {
            const attrRegex = /(\w+)=["']([^"']+)["']/g;
            let attrMatch;
            while ((attrMatch = attrRegex.exec(attributesStr)) !== null) {
              props[attrMatch[1]] = attrMatch[2];
            }
          }

          // Find the closing tag
          let xmlContent = '';
          let j = i + 1;
          let foundClosing = false;

          while (j < lines.length) {
            if (lines[j].trim() === closingTag) {
              foundClosing = true;
              break;
            }
            xmlContent += (xmlContent ? '\n' : '') + lines[j];
            j++;
          }

          if (foundClosing) {
            elements.push({
              type: 'xml',
              content: xmlContent,
              component: tagName,
              props,
            });
            i = j + 1;
            continue;
          }
        }
      }

      // If not XML or failed to parse, treat as text
      let textContent = line;
      let j = i + 1;

      // Collect consecutive non-XML lines
      while (j < lines.length && !lines[j].trim().startsWith('<')) {
        textContent += '\n' + lines[j];
        j++;
      }

      if (textContent.trim()) {
        elements.push({
          type: 'text',
          content: textContent,
        });
      }

      i = j;
    }

    return elements;
  }, [content]);

  const renderElement = (element: ParsedElement, index: number) => {
    if (element.type === 'text') {
      return <MarkdownRenderer key={index} content={element.content} className={className} />;
    }

    if (element.type === 'xml' && element.component === 'reasoning') {
      return (
        <ReasoningBlock
          key={index}
          title={element.props?.title || '推理过程'}
          content={element.content}
          defaultExpanded={element.props?.expanded === 'true'}
          className="my-2"
        />
      );
    }

    // Unknown XML component, skip rendering
    return null;
  };

  return (
    <div className={className}>
      {parsedElements.map((element, index) => renderElement(element, index))}
    </div>
  );
};

export default EnhancedMarkdownRenderer;
