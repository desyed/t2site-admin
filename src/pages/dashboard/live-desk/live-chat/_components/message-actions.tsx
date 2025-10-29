import { MessageSquare, Edit } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export function MessageActions() {
  return (
    <Card className="w-48 shadow-md">
      <CardContent className="p-0">
        <Button
          variant="ghost"
          className="flex w-full items-center justify-between rounded-none p-2 text-left"
        >
          <div className="flex items-center">
            <MessageSquare className="mr-2 size-4 text-orange-500" />
            <span>Reply</span>
          </div>
          <span className="text-xs text-muted-foreground">R</span>
        </Button>
        <Button
          variant="ghost"
          className="flex w-full items-center justify-between rounded-none p-2 text-left"
        >
          <div className="flex items-center">
            <Edit className="mr-2 size-4" />
            <span>Edit</span>
          </div>
          <span className="text-xs text-muted-foreground">E</span>
        </Button>
      </CardContent>
    </Card>
  );
}
