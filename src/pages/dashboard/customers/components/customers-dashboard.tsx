'use client';

import { PageHeader } from '@/components/dashboard/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CustomersDashboardProps {
  projectId: string;
}

export function CustomersDashboard({ projectId }: CustomersDashboardProps) {
  return (
    <div>
      <PageHeader title="Customers" />

      <div className="dashboard-container">
        <Card>
          <CardHeader>
            <CardTitle>Customer Management</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">View and manage your customers.</p>
            <div className="mt-4 rounded-lg border-2 border-dashed border-gray-300 p-8 text-center">
              <p className="text-gray-500">No customers found</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
