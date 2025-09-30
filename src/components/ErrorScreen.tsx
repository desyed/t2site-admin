import {
  RefreshCw,
  Home,
  WifiOff,
  Shield,
  ShieldAlert,
  FileX,
  Clock,
  ServerCrash,
  AlertTriangle,
  XCircle,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { handleApiErrorException } from '@/lib/utils';

interface ErrorScreenProps {
  error?: unknown;
  onRetry?: () => void;
  loading?: boolean;
  resourceName?: string;
  className?: string;
}

export default function ErrorScreen({
  error,
  onRetry,
  loading = false,
  resourceName = 'resource',
  className = '',
}: ErrorScreenProps) {
  // Extract error information using the existing error handling utility
  const { message, status, code } = handleApiErrorException(error, false);

  // Determine if it's a network error
  const isNetworkError = code === 'ERR_NETWORK' || code === 'FETCH_ERROR';

  // Get user-friendly error details with contextual icons and colors
  const getErrorDetails = () => {
    if (isNetworkError) {
      return {
        title: 'Connection Error',
        description: 'Please check your internet connection and try again.',
        icon: <WifiOff className="size-12 text-orange-500" />,
        bgColor: 'bg-orange-50 dark:bg-orange-950/20',
        borderColor: 'border-orange-200 dark:border-orange-800',
        textColor: 'text-orange-700 dark:text-orange-300',
      };
    }

    if (status === 401) {
      return {
        title: 'Unauthorized',
        description: 'Your session has expired. Please log in again.',
        icon: <Shield className="size-12 text-amber-500" />,
        bgColor: 'bg-amber-50 dark:bg-amber-950/20',
        borderColor: 'border-amber-200 dark:border-amber-800',
        textColor: 'text-amber-700 dark:text-amber-300',
      };
    }

    if (status === 403) {
      return {
        title: 'Access Denied',
        description: "You don't have permission to access this resource.",
        icon: <ShieldAlert className="size-12 text-red-500" />,
        bgColor: 'bg-red-50 dark:bg-red-950/20',
        borderColor: 'border-red-200 dark:border-red-800',
        textColor: 'text-red-700 dark:text-red-300',
      };
    }

    if (status === 404) {
      return {
        title: 'Not Found',
        description: `The requested ${resourceName} doesn't exist.`,
        icon: <FileX className="size-12 text-slate-500" />,
        bgColor: 'bg-slate-50 dark:bg-slate-950/20',
        borderColor: 'border-slate-200 dark:border-slate-800',
        textColor: 'text-slate-700 dark:text-slate-300',
      };
    }

    if (status === 429) {
      return {
        title: 'Too Many Requests',
        description: 'Please wait a moment before trying again.',
        icon: <Clock className="size-12 text-yellow-500" />,
        bgColor: 'bg-yellow-50 dark:bg-yellow-950/20',
        borderColor: 'border-yellow-200 dark:border-yellow-800',
        textColor: 'text-yellow-700 dark:text-yellow-300',
      };
    }

    if (status && status >= 500) {
      return {
        title: 'Server Error',
        description: 'Something went wrong on our end. Please try again later.',
        icon: <ServerCrash className="size-12 text-red-500" />,
        bgColor: 'bg-red-50 dark:bg-red-950/20',
        borderColor: 'border-red-200 dark:border-red-800',
        textColor: 'text-red-700 dark:text-red-300',
      };
    }

    if (status && status >= 400 && status < 500) {
      return {
        title: 'Request Error',
        description:
          'There was an issue with your request. Please check and try again.',
        icon: <XCircle className="size-12 text-orange-500" />,
        bgColor: 'bg-orange-50 dark:bg-orange-950/20',
        borderColor: 'border-orange-200 dark:border-orange-800',
        textColor: 'text-orange-700 dark:text-orange-300',
      };
    }

    return {
      title: 'Something Went Wrong',
      description: message || 'An unexpected error occurred. Please try again.',
      icon: <AlertTriangle className="size-12 text-slate-500" />,
      bgColor: 'bg-slate-50 dark:bg-slate-950/20',
      borderColor: 'border-slate-200 dark:border-slate-800',
      textColor: 'text-slate-700 dark:text-slate-300',
    };
  };

  const errorDetails = getErrorDetails();

  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else if (isNetworkError) {
      window.location.reload();
    } else {
      window.location.reload();
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm ${className}`}
    >
      <Card
        className={`w-[90%] max-w-md border-2 ${errorDetails.borderColor} ${errorDetails.bgColor}`}
      >
        <CardHeader className="text-center">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-background/80 p-4 shadow-lg">
              {errorDetails.icon}
            </div>
          </div>
          <CardTitle className={`text-2xl font-bold ${errorDetails.textColor}`}>
            {errorDetails.title}
          </CardTitle>
          <CardDescription
            className={`text-base ${errorDetails.textColor} opacity-80`}
          >
            {errorDetails.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Show technical error details in development */}
          {import.meta.env.DEV && error ? (
            <div className="rounded-lg border bg-background/60 p-4 text-xs">
              <div className="mb-2 font-semibold text-foreground">
                Debug Info:
              </div>
              <div className="space-y-1 text-muted-foreground">
                <div>
                  Status: <span className="font-mono">{status || 'N/A'}</span>
                </div>
                <div>
                  Code: <span className="font-mono">{code || 'N/A'}</span>
                </div>
                <div>
                  Message: <span className="font-mono">{message}</span>
                </div>
              </div>
            </div>
          ) : null}

          <div className="flex gap-3">
            <Button
              onClick={handleRetry}
              disabled={loading}
              className="h-11 flex-1 font-medium"
              size="lg"
            >
              {loading ? (
                <RefreshCw className="mr-2 size-4 animate-spin" />
              ) : (
                <RefreshCw className="mr-2 size-4" />
              )}
              Try Again
            </Button>
            <Button
              variant="outline"
              onClick={() => (window.location.href = '/')}
              className="h-11 flex-1 font-medium"
              size="lg"
            >
              <Home className="mr-2 size-4" />
              Go Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
