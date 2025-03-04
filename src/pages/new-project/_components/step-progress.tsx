import { Code2, Server, Settings, CheckCircle } from 'lucide-react';

import { cn } from '@/lib/utils';

const STEPS = [
  { title: 'Create', icon: Code2 },
  { title: 'Verify', icon: Server },
  { title: 'Services', icon: Settings },
  { title: 'Complete', icon: CheckCircle },
] as const;

interface StepProgressProps {
  currentStep: number;
}

export function StepProgress({ currentStep }: StepProgressProps) {
  return (
    <div className="relative w-full ">
      {/* Steps */}
      <div className="flex items-center justify-between">
        {STEPS.map((step, index) => (
          <div key={step.title} className="relative flex flex-col items-center">
            {/* Icon Circle */}
            <div
              className={cn(
                'relative z-10 flex items-center justify-center rounded-full',
                'size-8 transition-colors duration-300 md:size-16',
                currentStep >= index
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              )}
            >
              <step.icon className="size-4 md:size-8" />
            </div>

            {/* Title */}
            <span
              className={cn(
                'absolute -bottom-6 whitespace-nowrap text-xs md:text-sm font-medium ',
                currentStep >= index ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              {step.title}
            </span>
          </div>
        ))}

        {/* Progress Line */}
        <div className="absolute left-0 top-1/2 -z-0 h-[4px] w-full bg-muted">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{
              width: `${(currentStep / (STEPS.length - 1)) * 100}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
