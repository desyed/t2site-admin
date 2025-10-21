'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { PageHeader } from '@/components/dashboard/page-header';
import { Button } from '@/components/site-button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { createDashboardLoader } from '@/middlewares/auth-middleware';

export const loader = createDashboardLoader(async () => {
  return { title: 'Project Integrations Settings' };
});

const messengerSchema = z.object({
  appId: z.string().min(1, 'App ID is required'),
  appSecret: z.string().min(1, 'App Secret is required'),
  pageId: z.string().min(1, 'Page ID is required'),
  accessToken: z.string().min(1, 'Access Token is required'),
  webhookUrl: z.string().url('Invalid Webhook URL'),
  verifyToken: z.string().min(1, 'Verify Token is required'),
});

const whatsappSchema = z.object({
  appId: z.string().min(1, 'App ID is required'),
  businessId: z.string().min(1, 'Business Account ID is required'),
  phoneId: z.string().min(1, 'Phone Number ID is required'),
  accessToken: z.string().min(1, 'Access Token is required'),
  webhookUrl: z.string().url('Invalid Webhook URL'),
  verifyToken: z.string().min(1, 'Verify Token is required'),
});

const emailSchema = z.object({
  email: z.string().email('Invalid email'),
  smtpHost: z.string().min(1, 'SMTP Host required'),
  smtpPort: z.coerce.number().int().positive('Invalid port'),
  imapHost: z.string().min(1, 'IMAP Host required'),
  imapPort: z.coerce.number().int().positive('Invalid port'),
  password: z.string().min(1, 'Password required'),
});

export const Component = () => {
  const messengerForm = useForm({
    resolver: zodResolver(messengerSchema),
    defaultValues: {
      appId: '',
      appSecret: '',
      pageId: '',
      accessToken: '',
      webhookUrl: '',
      verifyToken: '',
    },
  });

  const whatsappForm = useForm({
    resolver: zodResolver(whatsappSchema),
    defaultValues: {
      appId: '',
      businessId: '',
      phoneId: '',
      accessToken: '',
      webhookUrl: '',
      verifyToken: '',
    },
  });

  const emailForm = useForm({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: '',
      smtpHost: '',
      smtpPort: 465,
      imapHost: '',
      imapPort: 993,
      password: '',
    },
  });

  const handleMessengerSubmit = (data: any) => {
    console.log('Messenger Config:', data);
  };

  const handleWhatsAppSubmit = (data: any) => {
    console.log('WhatsApp Config:', data);
  };

  const handleEmailSubmit = (data: any) => {
    console.log('Email Config:', data);
  };

  return (
    <div>
      <PageHeader title="Integrations" />
      <div className="dashboard-container">
        <div className="flex w-full max-w-xl flex-col gap-6">
          <Tabs defaultValue="messenger">
            <TabsList className="mb-4">
              <TabsTrigger value="messenger" className="px-8">
                Messenger
              </TabsTrigger>
              <TabsTrigger value="whatsapp" className="px-8">
                WhatsApp
              </TabsTrigger>
              <TabsTrigger value="email" className="px-8">
                Email
              </TabsTrigger>
            </TabsList>

            {/* MESSENGER */}
            <TabsContent value="messenger">
              <Card className="pt-6">
                <form
                  onSubmit={messengerForm.handleSubmit(handleMessengerSubmit)}
                >
                  <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="appId">App ID</Label>
                      <Input id="appId" {...messengerForm.register('appId')} />
                      {messengerForm.formState.errors.appId && (
                        <p className="text-sm text-red-500">
                          {messengerForm.formState.errors.appId.message}
                        </p>
                      )}
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="appSecret">App Secret</Label>
                      <Input
                        id="appSecret"
                        type="password"
                        {...messengerForm.register('appSecret')}
                      />
                      {messengerForm.formState.errors.appSecret && (
                        <p className="text-sm text-red-500">
                          {messengerForm.formState.errors.appSecret.message}
                        </p>
                      )}
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="pageId">Page ID</Label>
                      <Input
                        id="pageId"
                        {...messengerForm.register('pageId')}
                      />
                      {messengerForm.formState.errors.pageId && (
                        <p className="text-sm text-red-500">
                          {messengerForm.formState.errors.pageId.message}
                        </p>
                      )}
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="accessToken">Access Token</Label>
                      <Input
                        id="accessToken"
                        type="password"
                        {...messengerForm.register('accessToken')}
                      />
                      {messengerForm.formState.errors.accessToken && (
                        <p className="text-sm text-red-500">
                          {messengerForm.formState.errors.accessToken.message}
                        </p>
                      )}
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="webhookUrl">Webhook URL</Label>
                      <Input
                        id="webhookUrl"
                        placeholder="https://yourcrm.com/api/webhooks/messenger"
                        {...messengerForm.register('webhookUrl')}
                      />
                      {messengerForm.formState.errors.webhookUrl && (
                        <p className="text-sm text-red-500">
                          {messengerForm.formState.errors.webhookUrl.message}
                        </p>
                      )}
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="verifyToken">Verify Token</Label>
                      <Input
                        id="verifyToken"
                        {...messengerForm.register('verifyToken')}
                      />
                      {messengerForm.formState.errors.verifyToken && (
                        <p className="text-sm text-red-500">
                          {messengerForm.formState.errors.verifyToken.message}
                        </p>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit">Save Changes</Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>

            {/* WHATSAPP */}
            <TabsContent value="whatsapp">
              <Card className="pt-6">
                <form
                  onSubmit={whatsappForm.handleSubmit(handleWhatsAppSubmit)}
                >
                  <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="appId">App ID</Label>
                      <Input id="appId" {...whatsappForm.register('appId')} />
                      {whatsappForm.formState.errors.appId && (
                        <p className="text-sm text-red-500">
                          {whatsappForm.formState.errors.appId.message}
                        </p>
                      )}
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="businessId">Business Account ID</Label>
                      <Input
                        id="businessId"
                        {...whatsappForm.register('businessId')}
                      />
                      {whatsappForm.formState.errors.businessId && (
                        <p className="text-sm text-red-500">
                          {whatsappForm.formState.errors.businessId.message}
                        </p>
                      )}
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="phoneId">Phone Number ID</Label>
                      <Input
                        id="phoneId"
                        {...whatsappForm.register('phoneId')}
                      />
                      {whatsappForm.formState.errors.phoneId && (
                        <p className="text-sm text-red-500">
                          {whatsappForm.formState.errors.phoneId.message}
                        </p>
                      )}
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="accessToken">Access Token</Label>
                      <Input
                        id="accessToken"
                        type="password"
                        {...whatsappForm.register('accessToken')}
                      />
                      {whatsappForm.formState.errors.accessToken && (
                        <p className="text-sm text-red-500">
                          {whatsappForm.formState.errors.accessToken.message}
                        </p>
                      )}
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="webhookUrl">Webhook URL</Label>
                      <Input
                        id="webhookUrl"
                        {...whatsappForm.register('webhookUrl')}
                      />
                      {whatsappForm.formState.errors.webhookUrl && (
                        <p className="text-sm text-red-500">
                          {whatsappForm.formState.errors.webhookUrl.message}
                        </p>
                      )}
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="verifyToken">Verify Token</Label>
                      <Input
                        id="verifyToken"
                        {...whatsappForm.register('verifyToken')}
                      />
                      {whatsappForm.formState.errors.verifyToken && (
                        <p className="text-sm text-red-500">
                          {whatsappForm.formState.errors.verifyToken.message}
                        </p>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit">Save Changes</Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>

            {/* EMAIL */}
            <TabsContent value="email">
              <Card className="pt-6">
                <form onSubmit={emailForm.handleSubmit(handleEmailSubmit)}>
                  <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" {...emailForm.register('email')} />
                      {emailForm.formState.errors.email && (
                        <p className="text-sm text-red-500">
                          {emailForm.formState.errors.email.message}
                        </p>
                      )}
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="smtpHost">SMTP Host</Label>
                      <Input
                        id="smtpHost"
                        {...emailForm.register('smtpHost')}
                      />
                      {emailForm.formState.errors.smtpHost && (
                        <p className="text-sm text-red-500">
                          {emailForm.formState.errors.smtpHost.message}
                        </p>
                      )}
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="smtpPort">SMTP Port</Label>
                      <Input
                        id="smtpPort"
                        type="number"
                        {...emailForm.register('smtpPort')}
                      />
                      {emailForm.formState.errors.smtpPort && (
                        <p className="text-sm text-red-500">
                          {emailForm.formState.errors.smtpPort.message}
                        </p>
                      )}
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="imapHost">IMAP Host</Label>
                      <Input
                        id="imapHost"
                        {...emailForm.register('imapHost')}
                      />
                      {emailForm.formState.errors.imapHost && (
                        <p className="text-sm text-red-500">
                          {emailForm.formState.errors.imapHost.message}
                        </p>
                      )}
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="imapPort">IMAP Port</Label>
                      <Input
                        id="imapPort"
                        type="number"
                        {...emailForm.register('imapPort')}
                      />
                      {emailForm.formState.errors.imapPort && (
                        <p className="text-sm text-red-500">
                          {emailForm.formState.errors.imapPort.message}
                        </p>
                      )}
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="password">Password / App Password</Label>
                      <Input
                        id="password"
                        type="password"
                        {...emailForm.register('password')}
                      />
                      {emailForm.formState.errors.password && (
                        <p className="text-sm text-red-500">
                          {emailForm.formState.errors.password.message}
                        </p>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit">Save Changes</Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
