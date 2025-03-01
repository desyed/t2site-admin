'use client';

import { Filter, Search, SortAsc } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TooltipProvider } from '@/components/ui/tooltip';

import { TicketCard } from './ticket-card';
import { TicketDetails } from './ticket-details';

interface TicketsProps {
  defaultLayout?: number[];
}

export function Tickets({ defaultLayout = [20, 32, 48] }: TicketsProps) {
  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout:mail=${JSON.stringify(sizes)}`;
        }}
        className="h-full max-h-[760px] items-stretch"
      >
        <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
          <ScrollArea className="h-[calc(100vh-50px)] pb-4">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-background/95 p-4 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search ticket..."
                  className="h-8 rounded-sm pl-8"
                />
              </div>

              <div className="flex items-center gap-2">
                <Button
                  className="size-8 rounded-sm"
                  size={'icon'}
                  variant="outline"
                  icon={<Filter className="size-3" />}
                />
                <Button
                  className="size-8 rounded-sm"
                  size={'icon'}
                  variant="outline"
                  icon={<SortAsc className="size-3" />}
                />
              </div>
            </div>
            <div className="space-y-2 px-4 py-3 pb-6">
              {Array.from({ length: 6 }, (_, index) => (
                <TicketCard
                  key={`ticket-${index + 1}`}
                  ticketId={crypto.randomUUID()}
                />
              ))}
            </div>
          </ScrollArea>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[2]} minSize={30}>
          <TicketDetails />
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
}
