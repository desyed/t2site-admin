import { RefreshCw } from 'lucide-react';

import { Button } from '@/components/site-button';

type FetchErrorViewProps = {
  title: string;
  onRefresh?: () => void;
  errorActions?: {
    secondary?: {
      label: string;
      onClick: () => void;
    };
    primary?: {
      label: string;
      onClick: () => void;
    };
  };
};

export default function FetchErrorView({
  title,
  onRefresh,
  errorActions,
}: FetchErrorViewProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-4">
      <div className="text-center">
        <h3 className="mb-1 text-lg font-medium">Unable to load data</h3>
        <p className="text-sm text-muted-foreground">
          There was an error loading the {title}. This could be due to a network
          issue or server problem.
        </p>
      </div>
      {(onRefresh || errorActions) && (
        <div className="flex gap-3">
          {errorActions?.secondary ? (
            <Button
              variant="outline"
              size="sm"
              onClick={errorActions.secondary.onClick}
              icon={<RefreshCw className="mr-2 size-4" />}
            >
              {errorActions.secondary.label || 'Try again'}
            </Button>
          ) : (
            onRefresh && (
              <Button
                variant="outline"
                size="sm"
                icon={<RefreshCw className="mr-2 size-4" />}
                onClick={() => window.location.reload()}
              >
                Reload page
              </Button>
            )
          )}
          {errorActions?.primary ? (
            <Button
              size="sm"
              onClick={errorActions.primary.onClick}
              icon={<RefreshCw className="mr-2 size-4" />}
            >
              {errorActions.primary.label || 'Try again'}
            </Button>
          ) : (
            onRefresh && (
              <Button
                size="sm"
                onClick={onRefresh}
                icon={<RefreshCw className="mr-2 size-4" />}
              >
                Try again
              </Button>
            )
          )}
        </div>
      )}
    </div>
  );
}
