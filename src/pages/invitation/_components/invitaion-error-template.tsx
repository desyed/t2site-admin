import { ArrowLeftIcon, XCircleIcon, CircleAlertIcon } from 'lucide-react';
import { Link } from 'react-router';

import { Button } from '@/components/site-button';
import { cn } from '@/lib/utils';

export default function InvitationErrorTemplate({
  message,
  title,
  type = 'error',
}: {
  message: string;
  title: string;
  type: 'warning' | 'error';
}) {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center justify-center">
        <div
          className={cn(
            'mb-2 flex h-12 w-12 items-center justify-center rounded-full',
            type === 'warning' ? 'bg-primary/20' : 'bg-destructive/20'
          )}
        >
          {type === 'warning' ? (
            <CircleAlertIcon className="size-6 text-primary" />
          ) : (
            <XCircleIcon className="size-6 text-destructive" />
          )}
        </div>
        <h1
          className={cn(
            'text-xl font-semibold',
            type === 'warning' ? 'text-primary' : 'text-destructive'
          )}
        >
          {title}
        </h1>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          {message}
        </p>
      </div>
      <div className="mt-6">
        <Link to="/" replace>
          <Button
            variant="ghost"
            size="sm"
            icon={<ArrowLeftIcon className="mr-2 size-5" />}
            iconPosition="left"
          >
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
