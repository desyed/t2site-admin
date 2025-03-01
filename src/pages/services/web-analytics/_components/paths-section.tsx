'use client';

import { Info, GitFork } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export function PathsSection() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <CardTitle>Paths</CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="size-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Analysis of user navigation paths through your site</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Button variant="outline" size="sm" className="gap-2">
          Open as new insight
        </Button>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="path" className="w-full">
          <TabsList className="w-full justify-start gap-2 rounded-none border-b bg-transparent p-0">
            <TabsTrigger
              value="path"
              className="rounded-none border-b-2 border-transparent bg-transparent px-4 py-2 font-medium text-muted-foreground hover:text-foreground data-[state=active]:border-primary data-[state=active]:text-foreground"
            >
              Path
            </TabsTrigger>
            <TabsTrigger
              value="entry-path"
              className="rounded-none border-b-2 border-transparent bg-transparent px-4 py-2 font-medium text-muted-foreground hover:text-foreground data-[state=active]:border-primary data-[state=active]:text-foreground"
            >
              Entry path
            </TabsTrigger>
            <TabsTrigger
              value="end-path"
              className="rounded-none border-b-2 border-transparent bg-transparent px-4 py-2 font-medium text-muted-foreground hover:text-foreground data-[state=active]:border-primary data-[state=active]:text-foreground"
            >
              End path
            </TabsTrigger>
            <TabsTrigger
              value="outbound-clicks"
              className="rounded-none border-b-2 border-transparent bg-transparent px-4 py-2 font-medium text-muted-foreground hover:text-foreground data-[state=active]:border-primary data-[state=active]:text-foreground"
            >
              Outbound clicks
            </TabsTrigger>
          </TabsList>
          <div className="mt-4">
            <div className="grid grid-cols-12 gap-4 text-sm font-medium text-muted-foreground">
              <div className="col-span-6">PATH</div>
              <div className="col-span-2">VISITORS</div>
              <div className="col-span-2">VIEWS</div>
              <div className="col-span-2">BOUNCE RATE</div>
            </div>
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-muted p-4">
                <GitFork className="size-16 text-muted-foreground" />
              </div>
              <div className="mt-4 space-y-2">
                <h3 className="text-xl font-medium">
                  There are no matching events for this query
                </h3>
                <p className="text-sm text-muted-foreground">
                  Try changing the date range, or pick another action, event or
                  breakdown.
                </p>
              </div>
            </div>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}
