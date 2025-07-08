import React, { useRef, useCallback, useState } from 'react';
import MessageList from './MessageList';
import type { MessageListMethods, ChatMessage } from './MessageList';
import { Send } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

export type ChatWindowTheme = 'default' | 'borderless';

export interface ChatWindowProps {
  title?: string;
  placeholder?: string;
  onSendMessage?: (message: ChatMessage) => void;
  currentUserId?: string;
  licenseKey?: string;
  theme?: ChatWindowTheme;
}

export const ChatWindow = React.forwardRef<MessageListMethods, ChatWindowProps>(
  (
    {
      title = 'Chat Window',
      placeholder = 'Type a message...',
      onSendMessage,
      currentUserId = 'user-1',
      licenseKey = '',
      theme = 'default',
    },
    ref
  ) => {
    const [inputValue, setInputValue] = useState('');
    const messageListRef = useRef<MessageListMethods>(null);

    // 将内部的 messageListRef 暴露给外部
    React.useImperativeHandle(ref, () => messageListRef.current!, []);

    const handleSend = useCallback(() => {
      if (inputValue.trim() && messageListRef.current) {
        messageListRef.current.send(inputValue);
        setInputValue('');
      }
    }, [inputValue]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    };

    const handleMessageSent = useCallback(
      (message: ChatMessage) => {
        onSendMessage?.(message);
      },
      [onSendMessage]
    );

    const handleRetry = useCallback((messageId: string) => {
      if (messageListRef.current) {
        messageListRef.current.update(messageId, { failed: false });
      }
    }, []);

    // 主题样式定义
    const themeStyles = {
      default: {
        container:
          'flex flex-col h-full w-full bg-background rounded-lg border shadow-sm overflow-hidden',
        header: 'px-6 py-4 border-b bg-muted/50 flex-shrink-0',
        messagesContainer: 'flex-1 min-h-0 overflow-hidden bg-background',
        inputContainer: 'border-t px-4 py-4 flex-shrink-0',
      },
      borderless: {
        container: 'flex flex-col h-full w-full bg-background overflow-hidden',
        header: 'px-6 py-4 border-b bg-muted/50 flex-shrink-0',
        messagesContainer: 'flex-1 min-h-0 overflow-hidden bg-background',
        inputContainer: 'border-t px-4 py-4 flex-shrink-0',
      },
    };

    const currentTheme = themeStyles[theme];

    return (
      <div className={currentTheme.container}>
        {/* Header */}
        <div className={currentTheme.header}>
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>

        {/* Messages Container */}
        <div className={currentTheme.messagesContainer}>
          <MessageList
            ref={messageListRef}
            currentUserId={currentUserId}
            licenseKey={licenseKey}
            onSend={handleMessageSent}
            onRetry={handleRetry}
          />
        </div>

        {/* Input Container */}
        <div className={currentTheme.inputContainer}>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className={cn(
                'flex-1 px-4 py-2 text-sm rounded-lg border bg-background',
                'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                'placeholder:text-muted-foreground',
                'disabled:cursor-not-allowed disabled:opacity-50'
              )}
            />
            <Button
              onClick={handleSend}
              disabled={!inputValue.trim()}
              size="icon"
              className="rounded-lg"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }
);

ChatWindow.displayName = 'ChatWindow';
