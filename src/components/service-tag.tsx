import { ChartLine, MessageCircle, Cookie } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

// Define service configurations
const SERVICE_CONFIG = {
  analytics: {
    label: 'Web Analytics',
    description: 'Track website traffic and user behavior',
    icon: ChartLine,
  },
  chatbot: {
    label: 'Chat Assistant',
    description: 'AI-powered chat support',
    icon: MessageCircle,
  },
  cookieConsent: {
    label: 'Cookie Consent',
    description: 'GDPR-compliant cookie management',
    icon: Cookie,
  },
} as const;

type ServiceType = keyof typeof SERVICE_CONFIG;

interface ServiceTagProps {
  type: ServiceType;
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
              'flex items-center gap-1.5 text-xs p-1 px-2',
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
