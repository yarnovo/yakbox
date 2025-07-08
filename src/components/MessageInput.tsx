import React, { useState, useCallback } from 'react';
import { Send } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

export interface MessageInputProps {
  placeholder?: string;
  onSend?: (message: string) => void;
  disabled?: boolean;
  className?: string;
}

export const MessageInput: React.FC<MessageInputProps> = ({
  placeholder = 'Type a message...',
  onSend,
  disabled = false,
  className,
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleSend = useCallback(() => {
    if (inputValue.trim() && onSend) {
      onSend(inputValue.trim());
      setInputValue('');
    }
  }, [inputValue, onSend]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={cn('flex flex-col bg-background border rounded-lg overflow-hidden', className)}>
      {/* 上方区域：响应式输入框 */}
      <div className="flex-1 min-h-0">
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            'w-full h-full resize-none border-none outline-none p-3',
            'bg-transparent text-sm',
            'placeholder:text-muted-foreground',
            'disabled:cursor-not-allowed disabled:opacity-50'
          )}
          rows={1}
        />
      </div>

      {/* 下方区域：固定高度工具栏 */}
      <div className="h-12 border-t bg-muted/30 flex items-center justify-between px-3 flex-shrink-0">
        {/* 左侧：工具按钮区域（预留） */}
        <div className="flex items-center gap-2">{/* 这里可以放置其他工具按钮 */}</div>

        {/* 右侧：发送按钮 */}
        <Button
          onClick={handleSend}
          disabled={disabled || !inputValue.trim()}
          size="sm"
          className="rounded-md"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

MessageInput.displayName = 'MessageInput';
