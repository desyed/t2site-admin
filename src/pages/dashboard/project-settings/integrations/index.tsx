/* eslint-disable no-console */
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Check, Copy } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { PageHeader } from '@/components/dashboard/page-header';
import { Button } from '@/components/site-button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
  const [copiedCode, setCopiedCode] = useState(false);
  const [tabValue, setTabValue] = useState('live-chat'); // Track active tab manually

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

  const copyCodeSnippet = () => {
    const code = `<script>
  (function(d,s,id){
    var js,fjs=d.getElementsByTagName(s)[0];
    if(d.getElementById(id))return;
    js=d.createElement(s);js.id=id;
    js.src="https://widget.t2live.com/widget.js";
    js.setAttribute('data-project-id','project-id-here');
    js.setAttribute('data-theme','auto');
    fjs.parentNode.insertBefore(js,fjs);
  }(document,'script','t2live-widget'));
</script>`;
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div>
      <PageHeader title="Integrations" />
      <div className="dashboard-container">
        <div className="flex w-full max-w-3xl flex-col gap-6">
          <Tabs
            defaultValue="live-chat"
            value={tabValue}
            onValueChange={setTabValue}
          >
            {/* Desktop Tabs */}
            <div className="hidden md:block">
              <TabsList className="mb-4">
                <TabsTrigger value="live-chat" className="px-8">
                  Live Chat
                </TabsTrigger>
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
            </div>

            {/* 🆕 Mobile Select Dropdown */}
            <div className="mb-4 block md:hidden">
              <Select value={tabValue} onValueChange={setTabValue}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Integration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="live-chat">Live Chat</SelectItem>
                  <SelectItem value="messenger">Messenger</SelectItem>
                  <SelectItem value="whatsapp">WhatsApp</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* LIVE CHAT */}
            <TabsContent value="live-chat">
              <Card>
                <CardHeader>
                  <CardDescription>
                    Add this code snippet to your website to enable chat
                    functionality
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label>Code Snippet</Label>
                    <div className="relative mt-2">
                      <pre className="overflow-x-auto rounded-lg bg-gray-50 p-4 text-sm text-gray-800">
                        <code>{`<script src="http://localhost:8000/t2s-prj_8214353e-c361-4490-9bb7-9ddbc3bd1b6e
/scripts/main.js" async defer></script>`}</code>
                      </pre>
                      <Button
                        variant="outline"
                        size="sm"
                        className="absolute right-2 top-2 bg-white hover:bg-gray-200"
                        onClick={copyCodeSnippet}
                      >
                        {copiedCode ? (
                          <Check className="size-4" />
                        ) : (
                          <Copy className="size-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label className="font-semibold">
                      Installation Instructions
                    </Label>
                    <div className="rounded-lg p-4 text-sm text-gray-500">
                      <p className="mb-2">1. Copy the code snippet below</p>
                      <p className="mb-2">
                        2. Paste it before the closing &lt;/body&gt; tag on your
                        website
                      </p>
                      <p>
                        3. The chat widget will automatically appear on your
                        site
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

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
