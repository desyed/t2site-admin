'use client';

import { PageHeader } from '@/components/dashboard/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function EventsDashboard() {
  return (
    <div>
      <PageHeader title="Events" />

      <div className="dashboard-container">
        <Card>
          <CardHeader>
            <CardTitle>Event Tracking</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Configure and monitor events for your project.
            </p>
            <div className="mt-4 rounded-lg border-2 border-dashed border-gray-300 p-8 text-center">
              <p className="text-gray-500">No events configured yet</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
