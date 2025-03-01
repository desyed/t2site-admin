import { InfoIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';

type HoverCardMessageProps = {
  title?: React.ReactNode;
  description?: React.ReactNode;
};

export function HoverCardMessage({
  title,
  description,
}: HoverCardMessageProps) {
  return (
    <HoverCard openDelay={400}>
      <HoverCardTrigger asChild>
        <Button variant="ghost" className="size-6 p-0">
          <InfoIcon className="size-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </HoverCardTrigger>
      <HoverCardContent align="end" className="w-72 border-l-4 p-4">
        <div className="flex gap-3">
          <div className="shrink-0 text-primary">
            <InfoIcon className="size-4" />
          </div>
          <div>
            {title && <h4 className="mb-1 font-semibold ">{title}</h4>}
            {description && <p className="text-sm">{description}</p>}
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
