import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

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
    <div className={cn('flex gap-3 pb-3 px-2', isOwn && 'flex-row-reverse')}>
      {userAvatar && (
        <img
          src={userAvatar}
          alt={userName || 'User'}
          className="rounded-full w-8 h-8 border flex-shrink-0"
        />
      )}
      <div className={cn('flex flex-col gap-1 max-w-[70%]', isOwn ? 'items-end' : 'items-start')}>
        <div
          className={cn(
            'px-4 py-2 rounded-lg relative inline-block max-w-full',
            isOwn
              ? 'bg-primary text-primary-foreground rounded-br-none'
              : 'bg-muted rounded-bl-none'
          )}
        >
          {failed && (
            <div className="absolute -left-10 top-1/2 -translate-y-1/2">
              <Button
                onClick={onRetry}
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-destructive hover:text-destructive/80"
                title="重新发送"
              >
                <AlertTriangle className="h-4 w-4" />
              </Button>
            </div>
          )}
          <p className="text-sm break-words whitespace-pre-wrap">{message}</p>
        </div>
        {timestamp && (
          <span className="text-xs text-muted-foreground">
            {new Date(timestamp).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
        )}
        {failed && <span className="text-xs text-destructive">发送失败</span>}
      </div>
    </div>
  );
};

export default MessageBubble;
