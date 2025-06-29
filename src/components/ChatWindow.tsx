import React, { useRef, useCallback, useState } from 'react';
import MessageList from './MessageList';
import type { MessageListMethods, ChatMessage } from './MessageList';
import { SendIcon } from './icons';

export interface ChatWindowProps {
  title?: string;
  placeholder?: string;
  onSendMessage?: (message: ChatMessage) => void;
  currentUserId?: string;
  licenseKey?: string;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
  title = 'Chat Window',
  placeholder = 'Type a message...',
  onSendMessage,
  currentUserId = 'user-1',
  licenseKey = ''
}) => {
  const [inputValue, setInputValue] = useState('');
  const messageListRef = useRef<MessageListMethods>(null);

  const handleSend = useCallback(() => {
    if (inputValue.trim() && messageListRef.current) {
      const messageId = messageListRef.current.send(inputValue);
      setInputValue('');
      
      // 模拟消息发送（用于演示）
      setTimeout(() => {
        // 模拟 20% 的失败率
        if (Math.random() > 0.8) {
          messageListRef.current?.update(messageId, { failed: true });
        }
      }, 1000);
    }
  }, [inputValue]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleMessageSent = useCallback((message: ChatMessage) => {
    onSendMessage?.(message);
    
    // 模拟接收回复（用于演示）
    if (!message.message.includes('失败测试')) {
      setTimeout(() => {
        if (messageListRef.current) {
          messageListRef.current.receive({
            user: {
              id: 'assistant-1',
              name: 'Assistant',
              avatar: 'https://i.pravatar.cc/30?u=assistant',
            },
            message: `收到消息: "${message.message}"`
          });
        }
      }, 1500);
    }
  }, [onSendMessage]);

  const handleRetry = useCallback((messageId: string) => {
    if (messageListRef.current) {
      // 更新消息状态为成功
      messageListRef.current.update(messageId, { failed: false });
      
      // 这里应该重新发送消息到服务器
      console.log('重试发送消息:', messageId);
    }
  }, []);

  return (
    <div className="flex flex-col h-[600px] w-full max-w-2xl bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      
      {/* Messages Container */}
      <div className="flex-1 overflow-hidden bg-gray-50">
        <MessageList
          ref={messageListRef}
          currentUserId={currentUserId}
          licenseKey={licenseKey}
          onSend={handleMessageSent}
          onRetry={handleRetry}
        />
      </div>
      
      {/* Input Container */}
      <div className="border-t border-gray-200 px-4 py-4 bg-white">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
          />
          <button
            onClick={handleSend}
            disabled={!inputValue.trim()}
            className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
          >
            <SendIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};