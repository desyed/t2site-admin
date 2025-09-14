import { MousePointerClick } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

type AnalyticsCardProps = {
  titleTabs: string[];
  extraTabs?: string[];
};

export function AnalyticsCard({ titleTabs, extraTabs }: AnalyticsCardProps) {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between border-b px-5 py-0">
        {/* Tabs */}
        <Tabs defaultValue={titleTabs[0]}>
          <TabsList className="h-auto space-x-2 bg-transparent p-0">
            {titleTabs.map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="h-full rounded-none p-5 text-sm font-normal data-[state=active]:border-b-2 data-[state=active]:border-black"
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Right side: icon + label */}
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <MousePointerClick className="size-4" />
          <span>CLICKS</span>
        </div>
      </CardHeader>

      {/* Extra Tabs (like Domain / URL pills) */}
      {extraTabs && (
        <div className="flex gap-2 border-b bg-neutral-50 p-4">
          {extraTabs.map((extra) => (
            <Badge
              key={extra}
              variant="secondary"
              className="cursor-pointer rounded-md text-xs font-normal"
            >
              {extra}
            </Badge>
          ))}
        </div>
      )}

      <CardContent className="flex h-[250px] items-center justify-center text-sm text-gray-500">
        No data available
      </CardContent>
    </Card>
  );
}
