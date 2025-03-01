import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router';

import { Button } from '@/components/ui/button';

export default function NotFoundPage({
  title,
  description,
  buttonText,
  buttonLink,
}: {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}) {
  const navigate = useNavigate();
  return (
    <div className="relative flex flex-1 flex-col">
      <div className="mt-16 flex flex-1 flex-col items-center gap-6 px-5 sm:mt-28 sm:p-8">
        {/* Main Error Icon */}
        <div className="text-primary/90">
          <Icon icon="solar:shield-warning-broken" className="size-20" />
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold">{title}</h1>

        {/* Description */}
        <p className="max-w-md text-center text-lg text-muted-foreground">
          {description}
        </p>

        {/* Refined Button */}
        <Button
          variant="primaryDim"
          onClick={() => navigate(buttonLink)}
          size="sm"
          icon={<Icon icon="lucide:arrow-left" className="size-4" />}
        >
          {buttonText}
        </Button>

        {/* Subtle Support Link */}
        <p className="text-sm text-muted-foreground">
          Need help?{' '}
          <a
            href="/support"
            className="hover:text-primary-600 text-primary/90 transition-colors"
          >
            Contact support
          </a>
        </p>
      </div>

      {/* Subtle Background Pattern */}
      <div className="pointer-events-none fixed inset-0 -z-10 select-none opacity-[0.02]">
        <Icon icon="solar:squares-bold-duotone" className="size-full" />
      </div>
    </div>
  );
}
