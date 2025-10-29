import { Calendar, CreditCard, DollarSign } from 'lucide-react';

import { PageHeader } from '@/components/dashboard/page-header';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface BillingDashboardProps {
  projectId: string;
}

export function BillingDashboard({ projectId }: BillingDashboardProps) {
  return (
    <div>
      <PageHeader title="Billing" />

      <div className="dashboard-container space-y-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="size-5" />
                Current Plan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <h3 className="text-2xl font-bold">Free</h3>
                <p className="text-gray-600">$0/month</p>
                <Button className="mt-4 w-full">Upgrade to Pro</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Usage This Month</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Links Created</span>
                <span className="text-sm font-medium">23 / 1,000</span>
              </div>
              <div className="h-2 w-full rounded-full bg-gray-200">
                <div
                  className="h-2 rounded-full bg-blue-600"
                  style={{ width: '2.3%' }}
                ></div>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Clicks Tracked</span>
                <span className="text-sm font-medium">1,247 / 10,000</span>
              </div>
              <div className="h-2 w-full rounded-full bg-gray-200">
                <div
                  className="h-2 rounded-full bg-blue-600"
                  style={{ width: '12.47%' }}
                ></div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="size-5" />
                Payment Method
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center text-gray-500">
                <p className="mb-4">No payment method added</p>
                <Button variant="outline" className="w-full bg-transparent">
                  Add Payment Method
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="size-5" />
              Billing History
            </CardTitle>
            <CardDescription>Your past invoices and payments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="py-8 text-center text-gray-500">
              <p className="mb-4">No billing history available</p>
              <p className="text-sm">
                Invoices will appear here once you upgrade to a paid plan
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
