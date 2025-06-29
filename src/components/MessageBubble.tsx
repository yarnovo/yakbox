import React from 'react';
import { AlertTriangleIcon } from './icons';

export interface MessageBubbleProps {
  message: string;
  isOwn: boolean;
  userName?: string;
  userAvatar?: string;
  timestamp?: number;
  failed?: boolean;
  onRetry?: () => void;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  isOwn,
  userName,
  userAvatar,
  timestamp,
  failed = false,
  onRetry,
}) => {
  return (
    <div className={`flex gap-3 pb-3 ${isOwn ? 'flex-row-reverse' : ''}`}>
      {userAvatar && (
        <img 
          src={userAvatar} 
          alt={userName || 'User'}
          className="rounded-full w-8 h-8 border border-gray-300 flex-shrink-0"
        />
      )}
      <div className={`flex flex-col gap-1 max-w-[70%] ${isOwn ? 'items-end' : 'items-start'}`}>
        <div
          className={`px-4 py-2 rounded-lg relative ${
            isOwn 
              ? failed 
                ? 'bg-red-500 text-white rounded-br-none' 
                : 'bg-blue-500 text-white rounded-br-none'
              : 'bg-gray-100 text-gray-900 rounded-bl-none'
          }`}
        >
          {failed && (
            <div className="absolute -left-8 top-1/2 -translate-y-1/2">
              <button
                onClick={onRetry}
                className="text-red-500 hover:text-red-600 transition-colors"
                title="重新发送"
              >
                <AlertTriangleIcon className="w-5 h-5" />
              </button>
            </div>
          )}
          <p className="text-sm break-words">{message}</p>
        </div>
        {timestamp && (
          <span className={`text-xs ${isOwn ? 'text-gray-500' : 'text-gray-400'}`}>
            {new Date(timestamp).toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </span>
        )}
        {failed && (
          <span className="text-xs text-red-500">发送失败</span>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;