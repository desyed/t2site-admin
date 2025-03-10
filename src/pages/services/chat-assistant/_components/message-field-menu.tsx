import {
  Bookmark,
  Smile,
  ImageIcon,
  FileText,
  Paperclip,
  Bot,
  Workflow,
  X,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface MessageFieldMenuProps {
  onClose: () => void;
}

export function MessageFieldMenu({ onClose }: MessageFieldMenuProps) {
  const menuItems = [
    { icon: Bookmark, label: 'Macros' },
    { icon: Smile, label: 'Emojis' },
    { icon: ImageIcon, label: 'GIFs' },
    { icon: FileText, label: 'Articles' },
    { icon: Paperclip, label: 'Attachments' },
    { icon: ImageIcon, label: 'Images' },
    { icon: Bot, label: 'AI Compose' },
    { icon: Bot, label: 'Copilot suggestions' },
    { icon: Workflow, label: 'Workflows' },
  ];

  return (
    <Card className="w-64 shadow-lg">
      <CardContent className="p-0">
        {menuItems.map((item, index) => (
          <Button
            key={index}
            variant="ghost"
            className="flex w-full items-center justify-between rounded-none p-3 text-left"
          >
            <div className="flex items-center gap-2">
              <item.icon className="size-4" />
              <span>{item.label}</span>
            </div>
            <X className="size-4 text-muted-foreground" />
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}
