import { cn } from '@/lib/utils';

import { useTheme } from './theme-provider';

export default function Brand({ className }: { className?: string }) {
  const { colorMode } = useTheme();
  return (
    <div className="flex items-center gap-0.5">
      <div>
        <img
          draggable="false"
          src="/t2-site-brand-dark.svg"
          className={cn('h-[30px] w-[30px]', className)}
          style={{
            display: colorMode.isDark ? 'block' : 'none',
          }}
          alt="..."
        />

        <img
          draggable="false"
          src="/t2-chat-icon-light.svg"
          className={cn('h-[30px] w-[30px]', className)}
          style={{
            display: colorMode.isLight ? 'block' : 'none',
          }}
          alt="..."
        />
      </div>
      <p className="text-xl font-semibold">T2site</p>
    </div>
  );
}
