import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ReasoningBlockProps {
  title: string;
  content: string;
  defaultExpanded?: boolean;
  className?: string;
}

const ReasoningBlock: React.FC<ReasoningBlockProps> = ({
  title,
  content,
  defaultExpanded = false,
  className,
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={cn('border rounded-lg bg-muted/50', className)}>
      <button
        onClick={toggleExpanded}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-muted/70 transition-colors rounded-t-lg"
        type="button"
      >
        <span className="font-medium text-sm">{title}</span>
        <span className="text-muted-foreground">
          {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </span>
      </button>
      {isExpanded && <div className="px-4 py-3 border-t text-sm">{content}</div>}
    </div>
  );
};

export default ReasoningBlock;
