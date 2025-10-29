import { Loader2 } from 'lucide-react';

export default function ChatConnectionView() {
  return (
    <div className="flex h-full flex-col items-center justify-center space-y-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="relative">
        <Loader2 className="size-8 animate-spin text-primary" />
        <div className="absolute inset-0 animate-ping rounded-full bg-primary/20" />
      </div>
      <div className="text-center">
        <p className="text-lg font-medium text-foreground">
          Connecting to Live Desk
        </p>
        <p className="text-sm text-muted-foreground">
          Please wait while we establish a secure connection...
        </p>
      </div>
    </div>
  );
}
