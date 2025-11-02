import { AlertTriangle, Trash2 } from 'lucide-react';

import { PageHeader } from '@/components/dashboard/page-header';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createDashboardLoader } from '@/middlewares/auth-middleware';

export const loader = createDashboardLoader(() => {
  return {
    title: 'Project Security Settings',
  };
});

export const Component = () => {
  return (
    <>
      <PageHeader title="Security" />
      <div className="dashboard-container">
        <div className="w-full space-y-12 lg:w-1/2">
          <div className="space-y-4">
            <h3 className="text-[12px] uppercase text-gray-500">
              Change Password
            </h3>
            <Card className="border-none shadow-none">
              <CardContent className="space-y-4 p-0">
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input
                      id="current-password"
                      type="password"
                      className="mt-1"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" className="mt-1" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="confirm-password">
                      Confirm New Password
                    </Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      className="mt-1"
                    />
                  </div>
                  <Button>Update Password</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base text-red-600">
                  <AlertTriangle className="size-4" />
                  Danger Zone
                </CardTitle>
                <CardDescription>
                  Permanently delete your account and all associated data
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg bg-gray-50 p-4">
                  <h4 className="mb-2 font-medium">
                    This action cannot be undone
                  </h4>
                  <p className="mb-4 text-sm text-gray-500">
                    Deleting your account will permanently remove all your
                    projects, team members, chat history, and settings. This
                    action is irreversible.
                  </p>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="delete-confirmation">
                        Type &quot;DELETE&quot; to confirm
                      </Label>
                      <Input
                        id="delete-confirmation"
                        placeholder="DELETE"
                        className="mt-1"
                      />
                    </div>
                    <Button>
                      <Trash2 className="mr-2 size-4" />
                      Delete Account Permanently
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};
