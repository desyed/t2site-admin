import {
  BookmarkIcon,
  FileText,
  Image,
  Smile,
  Paperclip,
  Bot,
  Workflow,
} from 'lucide-react';

import { Button } from '@/components/ui/button';

export function MessageToolbar() {
  return (
    <div className="flex flex-wrap items-center gap-1">
      <Button variant="ghost" size="sm" className="h-8 gap-2 px-2">
        <BookmarkIcon className="size-4" />
        <span>Macros</span>
      </Button>
      <Button variant="ghost" size="sm" className="h-8 gap-2 px-2">
        <Smile className="size-4" />
        <span>Emojis</span>
      </Button>
      <Button variant="ghost" size="sm" className="h-8 gap-2 px-2">
        <Image className="size-4" />
        <span>GIFs</span>
      </Button>
      <Button variant="ghost" size="sm" className="h-8 gap-2 px-2">
        <FileText className="size-4" />
        <span>Articles</span>
      </Button>
      <Button variant="ghost" size="sm" className="h-8 gap-2 px-2">
        <Paperclip className="size-4" />
        <span>Attachments</span>
      </Button>
      <Button variant="ghost" size="sm" className="h-8 gap-2 px-2">
        <Image className="size-4" />
        <span>Images</span>
      </Button>
      <Button variant="ghost" size="sm" className="h-8 gap-2 px-2">
        <Bot className="size-4" />
        <span>AI Compose</span>
      </Button>
      <Button variant="ghost" size="sm" className="h-8 gap-2 px-2">
        <Bot className="size-4" />
        <span>Copilot suggestions</span>
      </Button>
      <Button variant="ghost" size="sm" className="h-8 gap-2 px-2">
        <Workflow className="size-4" />
        <span>Workflows</span>
      </Button>
    </div>
  );
}
