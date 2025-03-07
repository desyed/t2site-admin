import dayjs from 'dayjs';
import {
  CalendarDays,
  Globe,
  Key,
  LogOut,
  Mail,
  Pencil,
  Shield,
  Upload,
  User2,
} from 'lucide-react';

import { useAuthStore } from '@/app/auth/auth.store';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/auth-provider';

import { AuthTypeLabel } from './auth-type-label';

export default function Profile() {
  const { logout } = useAuth();
  const user = useAuthStore((state) => state.user);
  const session = useAuthStore((state) => state.session);

  return (
    <div className="space-y-6">
      <Card className="border-t-4 border-t-primary">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Avatar className="size-20">
                <AvatarImage src={user?.avatar ?? ''} alt={user?.name ?? ''} />
                <AvatarFallback>{user?.name?.charAt(0) ?? ''}</AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                variant="secondary"
                className="absolute -bottom-2 -right-2 size-8 rounded-full"
              >
                <Upload className="size-4" />
              </Button>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">{user?.name}</h2>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="gap-2">
                  <Pencil className="size-4" />
                  Edit Profile
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-muted-foreground">
                <Key className="size-4" />
                Account ID
              </Label>
              <p className="text-sm font-medium">{user?.id}</p>
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-muted-foreground">
                <Shield className="size-4" />
                Authentication Type
              </Label>
              <AuthTypeLabel
                type={user?.authType as 'emailPassword' | 'google' | 'github'}
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-muted-foreground">
                <Mail className="size-4" />
                Email Verified
              </Label>
              <p className="text-sm font-medium">
                {dayjs(user?.emailVerified).format('MMMM D, YYYY')}
              </p>
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-muted-foreground">
                <CalendarDays className="size-4" />
                Session Expires
              </Label>
              <p className="text-sm font-medium">
                {dayjs(session?.expiresAt).format('MMMM D, YYYY')}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-muted-foreground">
              <User2 className="size-4" />
              Current Organization ID
            </Label>
            <p className="break-all rounded-md bg-muted/50 p-2 text-sm font-medium">
              {user?.currentOrganizationId}
            </p>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-muted-foreground">
              <Globe className="size-4" />
              User Agent
            </Label>
            <p className="rounded-md bg-muted/50 p-2 text-sm font-medium">
              {session?.userAgent}
            </p>
          </div>
        </CardContent>
        <Separator />
        <CardFooter className="mt-6">
          <div className="flex w-full flex-col gap-4 sm:flex-row sm:justify-between">
            <div className="flex gap-4">
              <Button variant="destructive" className="gap-2" onClick={logout}>
                <LogOut className="size-4" />
                Logout
              </Button>
            </div>
            {user?.authType === 'emailPassword' && (
              <Button variant="outline" className="gap-2">
                <Key className="size-4" />
                Change Password
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
