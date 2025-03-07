import { Copy, Globe, Settings } from 'lucide-react';
import { toast } from 'sonner';

import { createProjectScriptTag } from '@/app/project/project.service';
import SiteCodeBlock from '@/components/site-code-block';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export async function loader() {
  // Fetch project data here
  return {
    projectName: 'Default project',
    projectId: '116765',
    apiKey: 'phc_tcd1QR16c87pDuuORrvvrVpuEn7unHwuLYitmUU5oYy',
    region: 'US Cloud',
  };
}

export function Component() {
  const copyToClipboard = (text: string, message: string) => {
    navigator.clipboard.writeText(text);
    toast.success(message);
  };

  return (
    <div className="mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold max-md:text-2xl">
            Project Settings
          </h1>
          <p className="text-base text-muted-foreground max-md:text-xs">
            These settings only apply to the current project.
          </p>
        </div>
        <Button variant="outline" size="sm">
          <Settings className="mr-2 size-4" />
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="api">API & Integration</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Project Information</CardTitle>
              <CardDescription>
                These settings only apply to the current project.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="projectName">Display Name</Label>
                <Input id="projectName" defaultValue="Default project" />
              </div>

              <div className="space-y-2">
                <Label>Project Region</Label>
                <div className="flex items-center space-x-2">
                  <Globe className="size-4 text-muted-foreground" />
                  <span>US Cloud</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>API Credentials</CardTitle>
                <CardDescription>
                  Your API keys and project identifiers.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Project API Key</Label>
                  <div className="flex space-x-2">
                    <Input
                      readOnly
                      value="phc_tcd1QR16c87pDuuORrvvrVpuEn7unHwuLYitmUU5oYy"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        copyToClipboard(
                          'phc_tcd1QR16c87pDuuORrvvrVpuEn7unHwuLYitmUU5oYy',
                          'API key copied to clipboard!'
                        )
                      }
                    >
                      <Copy className="size-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Use this write-only key in your application.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Project ID</Label>
                  <div className="flex space-x-2">
                    <Input readOnly value="116765" />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        copyToClipboard(
                          '116765',
                          'Project ID copied to clipboard!'
                        )
                      }
                    >
                      <Copy className="size-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Web Snippet</CardTitle>
                <CardDescription>
                  {`PostHog's`} configurable web snippet allows you to
                  autocapture events, record user sessions, and more.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid">
                <SiteCodeBlock
                  code={createProjectScriptTag('Default project')}
                  language="html"
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
