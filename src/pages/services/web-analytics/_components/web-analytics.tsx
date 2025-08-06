'use client';

import {
  RefreshCcw,
  Filter,
  Target,
  Clock,
  ChevronDown,
  ExternalLink,
  Info,
  BarChart3,
  MousePointer2,
  Eye,
  Timer,
} from 'lucide-react';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { ChannelsSection } from './channels-section';
import { PathsSection } from './paths-section';
import { RetentionSection } from './retention-section';

export default function AnalyticsDashboard() {
  const [activeTab, setActiveTab] = useState('web-analytics');

  return (
    <div className="flex min-h-screen flex-col ">
      <div className="flex flex-col space-y-4 p-4 md:p-8">
        <Tabs
          defaultValue="web-analytics"
          className="w-full"
          onValueChange={setActiveTab}
        >
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <TabsList className="h-10">
                <TabsTrigger value="web-analytics" className="px-4">
                  Web analytics
                </TabsTrigger>
                <TabsTrigger value="web-vitals" className="px-4">
                  Web vitals
                </TabsTrigger>
              </TabsList>

              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <RefreshCcw className="size-4" />
                </Button>
                <Badge
                  variant="outline"
                  className="flex items-center gap-1 rounded-full px-2 font-normal"
                >
                  <span className="size-2 rounded-full bg-red-500"></span>
                  <span>0 online</span>
                </Badge>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2"
                    size="sm"
                  >
                    <Filter className="size-4" />
                    <span className="hidden sm:inline">Filters</span>
                    <ChevronDown className="size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem>All pages</DropdownMenuItem>
                  <DropdownMenuItem>Landing pages</DropdownMenuItem>
                  <DropdownMenuItem>Blog posts</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {activeTab === 'web-vitals' && (
                <div className="flex gap-2">
                  <Badge variant="secondary">P75</Badge>
                  <Badge variant="outline">P90</Badge>
                  <Badge variant="outline">P99</Badge>
                </div>
              )}

              {activeTab === 'web-analytics' && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex items-center gap-2"
                      size="sm"
                    >
                      <Target className="size-4" />
                      <span className="hidden sm:inline">
                        Add conversion goal
                      </span>
                      <ChevronDown className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem>New goal</DropdownMenuItem>
                    <DropdownMenuItem>Manage goals</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="ml-auto flex items-center gap-2"
                    size="sm"
                  >
                    <Clock className="size-4" />
                    <span className="hidden sm:inline">Last 7 days</span>
                    <ChevronDown className="size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Last 24 hours</DropdownMenuItem>
                  <DropdownMenuItem>Last 7 days</DropdownMenuItem>
                  <DropdownMenuItem>Last 30 days</DropdownMenuItem>
                  <DropdownMenuItem>Last 90 days</DropdownMenuItem>
                  <DropdownMenuItem>Custom range</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <TabsContent value="web-analytics" className="mt-4">
            <WebAnalyticsTab />
          </TabsContent>

          <TabsContent value="web-vitals" className="mt-4">
            <WebVitalsTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function WebAnalyticsTab() {
  const [activeDataTab, setActiveDataTab] = useState('visitors');

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <MetricCard title="VISITORS" value="0" />
        <MetricCard title="PAGE VIEWS" value="0" />
        <MetricCard title="SESSIONS" value="0" />
        <MetricCard title="SESSION DURATION" value="-" />
        <MetricCard title="BOUNCE RATE" value="-" />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Unique visitors</h2>
          <div className="flex space-x-1 rounded-lg bg-muted p-1">
            <Button
              variant={activeDataTab === 'visitors' ? 'secondary' : 'ghost'}
              size="sm"
              className="rounded-md"
              onClick={() => setActiveDataTab('visitors')}
            >
              Visitors
            </Button>
            <Button
              variant={activeDataTab === 'views' ? 'secondary' : 'ghost'}
              size="sm"
              className="rounded-md"
              onClick={() => setActiveDataTab('views')}
            >
              Views
            </Button>
            <Button
              variant={activeDataTab === 'sessions' ? 'secondary' : 'ghost'}
              size="sm"
              className="rounded-md"
              onClick={() => setActiveDataTab('sessions')}
            >
              Sessions
            </Button>
          </div>
        </div>

        <div className="rounded-lg border bg-card">
          {activeDataTab === 'visitors' && <VisitorsContent />}

          {activeDataTab === 'views' && <ViewsContent />}

          {activeDataTab === 'sessions' && <SessionsContent />}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Top Pages</h2>
          <Button variant="outline" size="sm">
            View all
          </Button>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between py-3">
            <CardTitle className="text-sm font-medium">Page</CardTitle>
            <CardTitle className="text-sm font-medium">Views</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="flex flex-col divide-y">
              <EmptyTableRow message="No page view data available" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-sm font-medium">Top Referrers</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="flex flex-col divide-y">
              <EmptyTableRow message="No referrer data available" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-sm font-medium">Top Browsers</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="flex flex-col divide-y">
              <EmptyTableRow message="No browser data available" />
            </div>
          </CardContent>
        </Card>
      </div>

      <PathsSection />
      <ChannelsSection />
      <RetentionSection />
    </div>
  );
}

function VisitorsContent() {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-center">
      <div className="flex flex-col items-center justify-center space-y-4 py-12">
        <div className="rounded-full bg-muted p-4">
          <MousePointer2 className="size-16 text-muted-foreground" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-medium">
            There are no matching events for this query
          </h3>
          <p className="text-muted-foreground">
            Try changing the date range, or pick another action, event or
            breakdown.
          </p>
        </div>
      </div>
    </div>
  );
}

function ViewsContent() {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-center">
      <div className="flex flex-col items-center justify-center space-y-4 py-12">
        <div className="rounded-full bg-muted p-4">
          <Eye className="size-16 text-muted-foreground" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-medium">
            There are no page views for this period
          </h3>
          <p className="text-muted-foreground">
            Try changing the date range or check your tracking implementation.
          </p>
        </div>
      </div>
    </div>
  );
}

function SessionsContent() {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-center">
      <div className="flex flex-col items-center justify-center space-y-4 py-12">
        <div className="rounded-full bg-muted p-4">
          <Timer className="size-16 text-muted-foreground" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-medium">
            There are no sessions for this period
          </h3>
          <p className="text-muted-foreground">
            Try changing the date range or check your tracking implementation.
          </p>
        </div>
      </div>
    </div>
  );
}

function EmptyTableRow({ message }: { message: string }) {
  return (
    <div className="flex items-center justify-center p-4 text-sm text-muted-foreground">
      {message}
    </div>
  );
}

function WebVitalsTab() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <VitalMetricCard
          title="Interaction to Next Paint (INP)"
          value="0"
          unit="ms"
        />
        <VitalMetricCard
          title="Largest Contentful Paint (LCP)"
          value="0"
          unit="ms"
        />
        <VitalMetricCard
          title="First Contentful Paint (FCP)"
          value="0"
          unit="ms"
        />
        <VitalMetricCard title="Cumulative Layout Shift (CLS)" value="0.00" />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-medium">
              Interaction to Next Paint
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="size-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">
                      Measures the time it takes for the user to interact with
                      the page and for the page to respond to the interaction.
                      Lower is better.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Badge
                variant="success"
                className="bg-emerald-500/20 text-emerald-500"
              >
                Great
              </Badge>
              <span className="flex items-center text-sm text-emerald-500">
                <span className="mr-1 rounded-full bg-emerald-500/20 p-1">
                  <svg
                    width="6"
                    height="6"
                    viewBox="0 0 6 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="3" cy="3" r="3" fill="currentColor" />
                  </svg>
                </span>
                Below 200ms
              </span>
            </div>
            <CardDescription>
              More than 90% of visits had a great experience
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Measures the time it takes for the user to interact with the page
              and for the page to respond to the interaction. Lower is better.
            </p>
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardContent className="flex flex-1 flex-col items-center justify-center p-6 text-center">
            <div className="flex flex-col items-center justify-center space-y-4 py-8">
              <div className="rounded-full bg-muted p-4">
                <BarChart3 className="size-16 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-medium">
                  There are no matching events for this query
                </h3>
                <p className="text-muted-foreground">
                  Try changing the date range, or pick another action, event or
                  breakdown.
                </p>
              </div>
            </div>
            <Button variant="outline" className="mt-4 flex items-center gap-2">
              <ExternalLink className="size-4" />
              Open as new insight
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg font-medium">
            Path Breakdown
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="size-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">
                    Breakdown of performance metrics by path
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-lg border bg-card p-4">
              <div className="mb-2 flex items-center gap-2">
                <Badge
                  variant="success"
                  className="bg-emerald-500/20 text-emerald-500"
                >
                  Good
                </Badge>
                <span className="text-sm text-muted-foreground">
                  &lt; 200ms
                </span>
              </div>
              <div className="flex items-center justify-center py-12 text-sm text-muted-foreground">
                <span>🏆 No scores in this band</span>
              </div>
            </div>

            <div className="rounded-lg border bg-card p-4">
              <div className="mb-2 flex items-center gap-2">
                <Badge
                  variant="warning"
                  className="bg-amber-500/20 text-amber-500"
                >
                  Needs Improvements
                </Badge>
                <span className="text-sm text-muted-foreground">
                  200ms - 500ms
                </span>
              </div>
              <div className="flex items-center justify-center py-12 text-sm text-muted-foreground">
                <span>🚧 No scores in this band</span>
              </div>
            </div>

            <div className="rounded-lg border bg-card p-4">
              <div className="mb-2 flex items-center gap-2">
                <Badge
                  variant="destructive"
                  className="bg-red-500/20 text-red-500"
                >
                  Poor
                </Badge>
                <span className="text-sm text-muted-foreground">
                  &gt; 500ms
                </span>
              </div>
              <div className="flex items-center justify-center py-12 text-sm text-muted-foreground">
                <span>⚠️ No scores in this band</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function MetricCard({ title, value }: { title: string; value: string }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}

function VitalMetricCard({
  title,
  value,
  unit = '',
}: {
  title: string;
  value: string;
  unit?: string;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="size-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs">Web vital metric information</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-emerald-500">
          {value} {unit}
        </div>
      </CardContent>
    </Card>
  );
}
