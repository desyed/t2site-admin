import { cn } from '@/lib/utils';

export type HyperLinkProps = {
  icon?: boolean;
  children: React.ReactNode;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export default function HyperLink({
  icon = true,
  children,
  className,
  ...props
}: HyperLinkProps) {
  return (
    <a
      className={cn('flex gap-0.5 text-sm text-yellow-600', className)}
      {...props}
    >
      {children}{' '}
      {icon && (
        <span className="mt-1">
          <svg
            className="LemonIcon"
            width="1em"
            height="1em"
            fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            focusable="false"
            aria-hidden="true"
          >
            <path
              d="m19 19h-14v-14h7v-2h-7c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zm-5-16v2h3.59l-9.83 9.83 1.41 1.41 9.83-9.83v3.59h2v-7z"
              fill="currentColor"
            ></path>
          </svg>
        </span>
      )}
    </a>
  );
}
