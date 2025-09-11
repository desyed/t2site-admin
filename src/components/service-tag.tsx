import type { LucideIcon } from 'lucide-react';

import { ChartLine, MessageCircle, Cookie } from 'lucide-react';

import type { TServiceType } from '@/app/project/project.type';

import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

// Define service configurations
const SERVICE_CONFIG: {
  [key in TServiceType]: {
    label: string;
    description: string;
    icon: LucideIcon;
  };
} = {
  web_analytics: {
    label: 'Web Analytics',
    description: 'Track website traffic and user behavior',
    icon: ChartLine,
  },
  chat_assistant: {
    label: 'Chat Assistant',
    description: 'AI-powered chat support',
    icon: MessageCircle,
  },
  cookie_consent: {
    label: 'Cookie Consent',
    description: 'GDPR-compliant cookie management',
    icon: Cookie,
  },
} as const;

interface ServiceTagProps {
  type: TServiceType;
  className?: string;
}

export function ServiceTag({ type, className }: ServiceTagProps) {
  const service = SERVICE_CONFIG[type];

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Badge
            variant="secondary"
            className={cn(
              'flex items-center gap-1.5 p-1 px-2 text-xs',
              className
            )}
          >
            <service.icon className="size-4" />
            {service.label}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>{service.description}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
