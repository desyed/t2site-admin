import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';

// eslint-disable-next-line tailwindcss/no-contradicting-classname
const buttonVariants = cva(
  'inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground focus-visible:ring-foreground',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        destructiveGhost:
          'text-destructive hover:bg-destructive/10 hover:text-destructive',
        primaryDim:
          'border-0 bg-yellow-500/20 text-yellow-500 transition-colors hover:bg-yellow-600/20 hover:text-yellow-600 dark:border dark:border-primary/20 dark:bg-primary/10 dark:hover:bg-primary/20 dark:hover:text-primary',
        primaryGhost:
          'text-yellow-500 hover:bg-yellow-500/10 hover:text-yellow-600 dark:text-primary dark:hover:bg-primary/10 dark:hover:text-primary',
        link: 'text-primary underline-offset-4 hover:underline',
        soft: 'bg-primary/10 text-primary hover:bg-primary/20 dark:bg-primary/20 dark:hover:bg-primary/30',
        glass:
          'bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 dark:bg-black/10 dark:hover:bg-black/20',
        flat: 'bg-muted/50 text-muted-foreground hover:bg-muted',
        premium:
          'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white hover:from-yellow-600 hover:to-yellow-700',
        success: 'bg-emerald-500 text-white hover:bg-emerald-600',
        successGhost:
          'text-emerald-500 hover:bg-emerald-500/10 hover:text-emerald-600',
        warning: 'bg-orange-500 text-white hover:bg-orange-600',
        warningGhost:
          'text-orange-500 hover:bg-orange-500/10 hover:text-orange-600',
        info: 'bg-blue-500 text-white hover:bg-blue-600',
        infoGhost: 'text-blue-500 hover:bg-blue-500/10 hover:text-blue-600',
        subtle:
          'bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700',
        outline3D:
          'border-2 border-primary bg-background shadow-[4px_4px_0] shadow-primary hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none',
      },
      effect: {
        expandIcon: 'group relative gap-0',
        ringHover:
          'transition-all duration-300 hover:ring-2 hover:ring-primary/90 hover:ring-offset-2',
        shine:
          'before:animate-shine background-position_0s_ease relative overflow-hidden before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.5)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-no-repeat',
        shineHover:
          'relative overflow-hidden before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.5)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:transition-[background-position_0s_ease] before:duration-1000 hover:before:bg-[position:-100%_0,0_0]',
        gooeyRight:
          'relative z-0 overflow-hidden from-white/40 transition-all duration-500 before:absolute before:inset-0 before:-z-10 before:translate-x-[150%] before:translate-y-[150%] before:scale-[2.5] before:rounded-[100%] before:bg-gradient-to-r before:transition-transform before:duration-1000  hover:before:translate-x-0 hover:before:translate-y-0',
        gooeyLeft:
          'relative z-0 overflow-hidden from-white/40 transition-all duration-500 after:absolute after:inset-0 after:-z-10 after:translate-x-[-150%] after:translate-y-[150%] after:scale-[2.5] after:rounded-[100%] after:bg-gradient-to-l after:transition-transform after:duration-1000  hover:after:translate-x-0 hover:after:translate-y-0',
        underline:
          'relative !no-underline after:absolute after:bottom-2 after:h-px after:w-2/3 after:origin-bottom-left after:scale-x-100 after:bg-primary after:transition-transform after:duration-300 after:ease-in-out hover:after:origin-bottom-right hover:after:scale-x-0',
        hoverUnderline:
          'relative !no-underline after:absolute after:bottom-2 after:h-px after:w-2/3 after:origin-bottom-right after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 after:ease-in-out hover:after:origin-bottom-left hover:after:scale-x-100',
        pulse: 'hover:animate-pulse',
        bounce: 'transition hover:animate-bounce',
        scale:
          'transition-transform duration-300 hover:scale-105 active:scale-95',
        rotateLeft: 'transition-transform duration-300 hover:rotate-[358deg]',
        rotateRight: 'transition-transform duration-300 hover:rotate-2',
        slideUp:
          'transition-transform duration-300 hover:translate-y-[calc(-0.25rem)]',
        slideDown: 'transition-transform duration-300 hover:translate-y-1',
        glowPulse: 'animate-glow-pulse hover:animate-none',
        neonPulse:
          'shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-shadow duration-300 hover:shadow-[0_0_40px_rgba(255,255,255,0.5)]',
        ripple:
          'relative overflow-hidden transition-all duration-300 before:absolute before:left-1/2 before:top-1/2 before:size-0 before:rounded-full before:bg-white/20 before:opacity-0 before:transition-all before:duration-500 hover:before:size-[300%] hover:before:opacity-100',
        shake: 'hover:animate-shake',
        jelly: 'hover:animate-jelly active:animate-jelly',
        float:
          'transition-all duration-300 hover:translate-y-[calc(-0.5rem)] hover:shadow-lg',
        magnetic:
          'transition-transform duration-300 [transform-style:preserve-3d] hover:scale-105 hover:[transform:perspective(1000px)_rotateX(10deg)] active:scale-95',
        glitch:
          'relative before:absolute before:inset-0 before:translate-x-[2px] before:bg-inherit before:content-[""] after:absolute after:inset-0 after:translate-x-[2px] after:content-[""] hover:before:animate-glitch-1 hover:after:animate-glitch-2',
        none: '',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      effect: 'none',
    },
  }
);

type SpinnerType = 'circle' | 'dots' | 'bars';

interface LoadingProps {
  loading?: boolean;
  spinnerType?: SpinnerType;
  loadingText?: React.ReactNode;
}

interface IconProps {
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants>,
    LoadingProps,
    IconProps {
  asChild?: boolean;
}

const DotsSpinner = () => (
  <div className="flex gap-1">
    {[...Array(3)].map((_, i) => (
      <div
        key={i}
        className="size-1.5 animate-pulse rounded-full bg-current"
        style={{ animationDelay: `${i * 150}ms` }}
      />
    ))}
  </div>
);

const BarsSpinner = () => (
  <div className="flex gap-0.5">
    {[...Array(3)].map((_, i) => (
      <div
        key={i}
        className="h-4 w-1 animate-pulse rounded-full bg-current"
        style={{ animationDelay: `${i * 150}ms` }}
      />
    ))}
  </div>
);

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      effect,
      size,
      icon,
      iconPosition = 'left',
      loading = false,
      loadingText,
      spinnerType = 'circle',
      asChild = false,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';
    // if ((!variant || variant === 'default') && !effect) {
    //   effect = 'gooeyLeft';
    // }

    const Spinner = {
      circle: () => <Loader2 className="size-4 animate-spin" />,
      dots: DotsSpinner,
      bars: BarsSpinner,
    }[spinnerType];

    const renderContent = () => (
      <span className="inline-flex items-center gap-2">
        {iconPosition === 'left' && (loading ? <Spinner /> : icon)}
        <span>{loading ? loadingText || children : children}</span>
        {iconPosition === 'right' && (loading ? <Spinner /> : icon)}
      </span>
    );

    return (
      <Comp
        className={cn(
          buttonVariants({ variant, effect, size, className }),
          loading && 'cursor-wait'
        )}
        disabled={loading || props.disabled}
        ref={ref}
        {...props}
      >
        {renderContent()}
      </Comp>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
