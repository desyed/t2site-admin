import { cn } from '@/lib/utils';

export interface ISVGProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
  visable?: boolean;
}

export const LoadingSpinner = ({ size = 24, className, visable, ...props }: ISVGProps) => {
  return (
    visable && (
      // biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        {...props}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn('animate-spin', className)}
      >
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      </svg>
    )
  );
};
