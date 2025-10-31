'use client';

import { ChartLine, ListFilter } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import type { ChartConfig } from '@/components/ui/chart';

import { PageHeader } from '@/components/dashboard/page-header';
import ProfileCompletionFloatDialog from '@/components/dashboard/profile-completion-float-dialog';
import { Button } from '@/components/ui/button';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const chartData = [
  { month: 'January', desktop: 80 },
  { month: 'February', desktop: 200 },
  { month: 'March', desktop: 120 },
  { month: 'April', desktop: 190 },
  { month: 'May', desktop: 130 },
  { month: 'June', desktop: 140 },
];

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'var(--chart-2)',
  },
} satisfies ChartConfig;

export function AnalyticsDashboard() {
  return (
    <div className="relative">
      <PageHeader title="Analytics" />

      <div className="dashboard-container">
        {/* <div className="flex items-center justify-between gap-3 pb-3 max-md:flex-col">
          <div className="flex w-full items-center gap-3">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="min-w-[110px] justify-between"
                >
                  <span className="flex items-center gap-2">
                    <ListFilter />
                    {value
                      ? frameworks.find(
                          (framework) => framework.value === value
                        )?.label
                      : 'Filter'}
                  </span>
                  <ChevronDown className="opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput
                    placeholder="Search framework..."
                    className="h-9"
                  />
                  <CommandList>
                    <CommandEmpty>No framework found.</CommandEmpty>
                    <CommandGroup>
                      {frameworks.map((framework) => (
                        <CommandItem
                          key={framework.value}
                          value={framework.value}
                          onSelect={(currentValue) => {
                            setValue(
                              currentValue === value ? '' : currentValue
                            );
                            setOpen(false);
                          }}
                        >
                          {framework.label}
                          <Check
                            className={cn(
                              'ml-auto',
                              value === framework.value
                                ? 'opacity-100'
                                : 'opacity-0'
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            <Select defaultValue="24h">
              <SelectTrigger className="w-48 max-md:w-full">
                <div className="flex items-center">
                  <Calendar className="mr-2 size-4" />
                  <SelectValue />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">Last 24 hours</SelectItem>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-3 max-md:w-full">
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="min-w-[110px] justify-between max-md:w-full"
            >
              <span className="flex items-center gap-2">
                <Grid3x3 />
                Switch to Events
              </span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="px-2">
                  <EllipsisVertical />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="flex w-48 items-center"
                align="start"
              >
                <Button variant="ghost">
                  <Download className="size-4" />
                  Download as CSV
                </Button>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div> */}

        {/* Analytics Stats & Charts */}
        <div className="w-full overflow-hidden bg-white">
          <div className="border border-neutral-200 sm:rounded-t-xl">
            <div className="grid w-full grid-cols-3 divide-x divide-neutral-200 overflow-y-hidden">
              <div className="relative z-0">
                <div className="border-box relative block h-full min-w-[110px] flex-none px-4 py-3 ring-inset ring-neutral-500 transition-colors hover:bg-neutral-50 focus:outline-none focus-visible:ring-1 active:bg-neutral-100 sm:min-w-[240px] sm:px-8 sm:py-6 sm:first:rounded-tl-xl">
                  <div className="absolute bottom-0 left-0 h-0.5 w-full bg-black transition-transform duration-100"></div>
                  <div className="flex items-center gap-2.5 text-sm text-neutral-600">
                    <div className="size-2 bg-current text-blue-500/50 shadow-[inset_0_0_0_1px_#00000019]"></div>
                    <span>Session</span>
                  </div>
                  <div className="mt-1 flex h-12 items-center text-xl font-medium md:text-3xl">
                    0
                  </div>
                </div>
              </div>

              <div className="relative z-0">
                <div className="absolute left-0 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-neutral-200 bg-white p-1.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-chevron-right size-3 text-neutral-400"
                  >
                    <path d="m9 18 6-6-6-6"></path>
                  </svg>
                </div>
                <div className="border-box relative block h-full min-w-[110px] flex-none px-4 py-3 ring-inset ring-neutral-500 transition-colors hover:bg-neutral-50 focus:outline-none focus-visible:ring-1 active:bg-neutral-100 sm:min-w-[240px] sm:px-8 sm:py-6 sm:first:rounded-tl-xl">
                  <div className="flex items-center gap-2.5 text-sm text-neutral-600">
                    <div className="size-2 bg-current text-blue-500/50 shadow-[inset_0_0_0_1px_#00000019]"></div>
                    <span>Leads</span>
                  </div>
                  <div className="mt-1 flex h-12 items-center text-xl font-medium md:text-3xl">
                    0
                  </div>
                </div>
              </div>

              <div className="relative z-0">
                <div className="absolute left-0 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-neutral-200 bg-white p-1.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-chevron-right size-3 text-neutral-400"
                  >
                    <path d="m9 18 6-6-6-6"></path>
                  </svg>
                </div>
                <div className="border-box relative block h-full min-w-[110px] flex-none px-4 py-3 ring-inset ring-neutral-500 transition-colors hover:bg-neutral-50 focus:outline-none focus-visible:ring-1 active:bg-neutral-100 sm:min-w-[240px] sm:px-8 sm:py-6 sm:first:rounded-tl-xl">
                  <div className="flex items-center gap-2.5 text-sm text-neutral-600">
                    <div className="size-2 bg-current text-neutral-500/50 shadow-[inset_0_0_0_1px_#00000019]"></div>
                    <span>Events</span>
                  </div>
                  <div className="mt-1 flex h-12 items-center text-xl font-medium md:text-3xl">
                    0
                  </div>
                </div>

                {/* <div className="absolute right-3 top-3 z-0 hidden w-fit shrink-0 items-center gap-1 rounded-xl border border-neutral-100 bg-neutral-100 p-1 sm:flex">
                  <button
                    type="button"
                    data-selected="true"
                    className="text-content-emphasis relative z-10 flex size-8 items-center justify-center gap-2 p-0 text-sm font-medium capitalize"
                  >
                    <div className="text-base">$</div>
                    <div className="absolute left-0 top-0 -z-10 size-full rounded-lg border border-neutral-200 bg-white"></div>
                  </button>
                  <button
                    type="button"
                    data-selected="false"
                    className="text-content-emphasis hover:text-content-subtle relative z-[11] flex size-8 items-center justify-center gap-2 p-0 text-sm font-medium capitalize transition-colors"
                  >
                    <div className="text-[11px]">123</div>
                  </button>
                </div> */}
              </div>
            </div>
          </div>

          <div className="relative w-full overflow-hidden border-x border-b px-4 py-6 sm:rounded-b-xl sm:p-10">
            <div className="absolute right-3 top-3 z-0 flex w-fit shrink-0 items-center gap-1 rounded-xl border border-neutral-100 bg-neutral-100 p-1">
              <Button
                variant="ghost"
                className="relative -z-10 flex size-8 items-center justify-center gap-2 p-0 text-sm font-medium capitalize"
              >
                <ChartLine />
                <div className="absolute left-0 top-0 -z-10 size-full rounded-lg border border-neutral-200 bg-white"></div>
              </Button>
              <Button
                variant="ghost"
                className="relative z-10 flex size-8 items-center justify-center gap-2 p-0 text-sm font-medium capitalize transition-colors"
              >
                <ListFilter />
              </Button>
            </div>

            <div className="aspect-auto h-fit w-full">
              <ChartContainer
                config={chartConfig}
                className="h-96 w-full pt-12"
              >
                <AreaChart
                  accessibilityLayer
                  data={chartData}
                  margin={{
                    left: 12,
                    right: 12,
                    top: 12,
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent />}
                  />
                  <defs>
                    <linearGradient
                      id="fillDesktop"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="var(--color-desktop)"
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="95%"
                        stopColor="var(--color-desktop)"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  </defs>
                  <Area
                    dataKey="desktop"
                    type="natural"
                    fill="url(#fillDesktop)"
                    fillOpacity={0.4}
                    stroke="var(--color-desktop)"
                  />
                </AreaChart>
              </ChartContainer>
            </div>
          </div>
        </div>

        {/* Analytics Cards */}
        {/* <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <AnalyticsCard titleTabs={['Short Links', 'Destination URLs']} />
          <AnalyticsCard
            titleTabs={['Referrers', 'UTM Parameters']}
            extraTabs={['Domain', 'URL']}
          />
          <AnalyticsCard
            titleTabs={['Countries', 'Cities', 'Regions', 'Continents']}
          />
          <AnalyticsCard
            titleTabs={['Devices', 'Browsers', 'OS', 'Triggers']}
          />
        </div> */}
      </div>

      <ProfileCompletionFloatDialog />
    </div>
  );
}
