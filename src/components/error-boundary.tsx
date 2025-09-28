import {
  AlertCircle,
  RefreshCw,
  WifiOff,
  Bug,
  Home,
  ArrowLeft,
  X,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useRouteError, isRouteErrorResponse } from 'react-router';

import Brand from '@/components/Brand';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

type ErrorType = 'network' | 'notFound' | 'unauthorized' | 'default';

interface ErrorDetails {
  title: string;
  description: string;
  icon: React.ReactNode;
  actions: React.ReactNode;
}

export default function ErrorBoundary() {
  const error = useRouteError();
  const navigate = useNavigate();
  const [showDevError, setShowDevError] = useState(true);
  const [isStackOpen, setIsStackOpen] = useState(true);

  // Log error in development
  useEffect(() => {
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.error('Route Error:', error);
    }
  }, [error]);

  // Determine error type and details
  const getErrorType = (): ErrorType => {
    if (isRouteErrorResponse(error)) {
      if (error.status === 404) return 'notFound';
      if (error.status === 401) return 'unauthorized';
    }
    if (error instanceof Error) {
      if (
        error.message.includes('Failed to fetch') ||
        error.message.includes('Network') ||
        error.message.includes('dynamically imported module')
      ) {
        return 'network';
      }
    }
    return 'default';
  };

  const getErrorDetails = (type: ErrorType): ErrorDetails => {
    const baseActions = (
      <>
        <Button
          variant="default"
          onClick={() => window.location.reload()}
          className="gap-2"
        >
          <RefreshCw className="size-4" />
          Try Again
        </Button>
        <Button
          variant="outline"
          onClick={() => navigate('/')}
          className="gap-2"
        >
          <Home className="size-4" />
          Go Home
        </Button>
        <Button variant="ghost" onClick={() => navigate(-1)} className="gap-2">
          <ArrowLeft className="size-4" />
          Go Back
        </Button>
      </>
    );

    switch (type) {
      case 'network':
        return {
          title: 'Connection Error',
          description: 'Please check your internet connection and try again.',
          icon: <WifiOff className="size-12 text-muted-foreground" />,
          actions: baseActions,
        };
      case 'notFound':
        return {
          title: 'Page Not Found',
          description: "The page you're looking for doesn't exist.",
          icon: <AlertCircle className="size-12 text-muted-foreground" />,
          actions: baseActions,
        };
      case 'unauthorized':
        return {
          title: 'Unauthorized Access',
          description: 'You do not have permission to access this page.',
          icon: <AlertCircle className="size-12 text-muted-foreground" />,
          actions: baseActions,
        };
      default:
        return {
          title: 'Something Went Wrong',
          description:
            'An unexpected error occurred. Our team has been notified.',
          icon: <Bug className="size-12 text-muted-foreground" />,
          actions: baseActions,
        };
    }
  };

  const errorType = getErrorType();
  const errorDetails = getErrorDetails(errorType);
  const errorMessage = isRouteErrorResponse(error)
    ? error.statusText || error.data
    : error instanceof Error
      ? error.message
      : 'An unexpected error occurred';

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="flex h-16 items-center justify-between border-b px-4 md:px-6">
        <Brand />
      </header>

      {/* Main Content */}
      <main className="container mx-auto flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
        <Card className="mx-auto max-w-md">
          <CardHeader className="text-center">
            <div className="mb-4 flex justify-center">{errorDetails.icon}</div>
            <CardTitle className="text-2xl">{errorDetails.title}</CardTitle>
            <CardDescription>{errorDetails.description}</CardDescription>
          </CardHeader>

          <CardContent>
            <Alert variant="destructive" className="text-sm">
              <AlertTitle className="flex items-center gap-2">
                <AlertCircle className="size-4" />
                Error Details
              </AlertTitle>
              <AlertDescription className="mt-2 font-mono">
                {errorMessage}
              </AlertDescription>
            </Alert>
          </CardContent>

          <CardFooter className="flex flex-col gap-2 sm:flex-row sm:justify-center">
            {errorDetails.actions}
          </CardFooter>
        </Card>
      </main>

      {/* Development Error Stack - Closeable Alert */}
      {import.meta.env.DEV && error instanceof Error && showDevError && (
        <div className="fixed inset-x-4 bottom-4 bg-background">
          <Alert variant="destructive" className="relative bg-destructive/10">
            <div className="absolute right-2 top-2 flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="size-6 hover:bg-destructive/10"
                onClick={() => setIsStackOpen(!isStackOpen)}
              >
                {isStackOpen ? (
                  <ChevronUp className="size-4" />
                ) : (
                  <ChevronDown className="size-4" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="size-6 hover:bg-destructive/10"
                onClick={() => setShowDevError(false)}
              >
                <X className="size-4" />
              </Button>
            </div>

            <AlertCircle className="size-4" />
            <AlertTitle>Stack Trace (Development Only)</AlertTitle>

            {isStackOpen && (
              <AlertDescription>
                <pre className="mt-2 max-h-[300px] overflow-auto whitespace-pre-wrap rounded bg-destructive/10 p-4 text-xs">
                  {error.stack}
                </pre>
              </AlertDescription>
            )}
          </Alert>
        </div>
      )}
    </div>
  );
}
