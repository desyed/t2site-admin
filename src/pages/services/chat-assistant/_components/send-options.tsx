import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface SendOptionsProps {
  onClose: () => void;
}

export function SendOptions({ onClose }: SendOptionsProps) {
  return (
    <Card className="w-64 shadow-lg">
      <CardContent className="p-0">
        <div className="flex items-center justify-between border-b p-3">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="h-8 font-medium">
              Send and close
            </Button>
          </div>
          <div className="text-xs text-muted-foreground">
            <span className="rounded border px-1 py-0.5 text-xs">Ctrl</span>{' '}
            <span className="rounded border px-1 py-0.5 text-xs">Shift</span>{' '}
            <span className="rounded border px-1 py-0.5 text-xs">Enter</span>
          </div>
        </div>
        <Button
          variant="ghost"
          className="w-full justify-start rounded-none p-3 text-left"
        >
          Send and snooze
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start rounded-none p-3 text-left"
        >
          Later today
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start rounded-none p-3 text-left"
        >
          Tomorrow
        </Button>
        <div className="flex items-center justify-between p-3">
          <Button variant="ghost" className="justify-start p-0 text-left">
            Monday
          </Button>
          <div className="text-xs text-muted-foreground">
            <span className="rounded border px-1 py-0.5 text-xs">Ctrl</span>{' '}
            <span className="rounded border px-1 py-0.5 text-xs">Alt</span>{' '}
            <span className="rounded border px-1 py-0.5 text-xs">Enter</span>
          </div>
        </div>
        <Button
          variant="ghost"
          className="w-full justify-start rounded-none p-3 text-left"
        >
          One week
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start rounded-none p-3 text-left"
        >
          One month
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start rounded-none p-3 text-left"
        >
          Custom
        </Button>
      </CardContent>
    </Card>
  );
}
