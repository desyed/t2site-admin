import { cn } from '@/lib/utils';

import { useTheme } from './theme-provider';

export default function Brand({ className }: { className?: string }) {
  const { colorMode } = useTheme();
  return (
    <>
      <img
        draggable="false"
        src="/t2-site-brand-dark.svg"
        className={cn(
          'h-[30px] w-[90px] sm:w-[110px] lg:w-[120px] -rotate-2',
          className
        )}
        style={{
          display: colorMode.isDark ? 'block' : 'none',
        }}
        alt="..."
      />

      <img
        draggable="false"
        src="/t2-site-brand-light.svg"
        className={cn(
          'h-[30px] w-[90px] sm:w-[110px] lg:w-[120px] -rotate-2',
          className
        )}
        style={{
          display: colorMode.isLight ? 'block' : 'none',
        }}
        alt="..."
      />
    </>
  );
}
