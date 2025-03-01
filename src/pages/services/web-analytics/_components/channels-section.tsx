'use client';

import { Info, Share2, Smartphone } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export function ChannelsSection() {
  return (
    <Card className="mt-4">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <CardTitle>Channels</CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="size-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Analysis of traffic sources and device types</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent>
        {/* Controls Section - Stack on mobile */}
        <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Channel selector and label */}
          <div className="flex flex-wrap items-center gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Channel" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Channels</SelectItem>
                <SelectItem value="direct">Direct</SelectItem>
                <SelectItem value="organic">Organic Search</SelectItem>
                <SelectItem value="referral">Referral</SelectItem>
              </SelectContent>
            </Select>
            <span className="text-sm text-muted-foreground">Device type</span>
          </div>

          {/* Badges - Scroll horizontally on mobile */}
          <div className="no-scrollbar flex gap-2 overflow-x-auto">
            <Badge variant="secondary">Device type</Badge>
            <Badge variant="outline">Browser</Badge>
            <Badge variant="outline">OS</Badge>
            <Badge variant="outline">Viewport</Badge>
          </div>
        </div>

        {/* Grid Section - Stack on mobile */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Channel Type Section */}
          <div className="space-y-4">
            <div className="grid grid-cols-12 gap-2 text-sm font-medium text-muted-foreground">
              <div className="col-span-8 truncate">INITIAL CHANNEL TYPE</div>
              <div className="col-span-2 truncate">VISITORS</div>
              <div className="col-span-2 truncate">VIEWS</div>
            </div>
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="rounded-full bg-muted p-4">
                <Share2 className="size-10 text-muted-foreground sm:size-12" />
              </div>
              <div className="mt-4">
                <p className="text-xs text-muted-foreground sm:text-sm">
                  There are no matching events for this query
                </p>
              </div>
            </div>
          </div>

          {/* Device Type Section */}
          <div className="space-y-4">
            <div className="grid grid-cols-12 gap-2 text-sm font-medium text-muted-foreground">
              <div className="col-span-8 truncate">DEVICE TYPE</div>
              <div className="col-span-2 truncate">VISITORS</div>
              <div className="col-span-2 truncate">VIEWS</div>
            </div>
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="rounded-full bg-muted p-4">
                <Smartphone className="size-10 text-muted-foreground sm:size-12" />
              </div>
              <div className="mt-4">
                <p className="text-xs text-muted-foreground sm:text-sm">
                  There are no matching events for this query
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Show more button */}
        <div className="mt-4 flex justify-center sm:justify-end">
          <Button variant="outline" size="sm" className="w-full sm:w-auto">
            Show more
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
