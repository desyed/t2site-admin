'use client';

import { Info } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const retentionData = [
  {
    cohort: 'Feb 16 to Feb 22',
    size: 0,
    week0: '0.0%',
    week1: '0.0%',
  },
  {
    cohort: 'Feb 23 to Mar 1',
    size: 0,
    week0: '0.0%',
    week1: '0.0%',
  },
];

export function RetentionSection() {
  return (
    <Card className="mt-4">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <CardTitle>Retention</CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="size-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Analysis of user retention over time</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-2 text-left font-medium text-muted-foreground">
                  Cohort
                </th>
                <th className="px-4 py-2 text-left font-medium text-muted-foreground">
                  Size
                </th>
                <th className="px-4 py-2 text-left font-medium text-muted-foreground">
                  Week 0
                </th>
                <th className="px-4 py-2 text-left font-medium text-muted-foreground">
                  Week 1
                </th>
              </tr>
            </thead>
            <tbody>
              {retentionData.map((row) => (
                <tr key={row.cohort} className="border-b">
                  <td className="px-4 py-2">{row.cohort}</td>
                  <td className="px-4 py-2">{row.size}</td>
                  <td className="px-4 py-2">
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-16 rounded bg-primary/10"></div>
                      {row.week0}
                    </div>
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-16 rounded bg-primary/10"></div>
                      {row.week1}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex justify-end">
          <Button variant="outline" size="sm">
            Show more
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
