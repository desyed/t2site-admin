import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useState } from 'react';

import { PageHeader } from '@/components/dashboard/page-header';
import { Button } from '@/components/site-button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createDashboardLoader } from '@/middlewares/auth-middleware';

export const loader = createDashboardLoader(() => {
  return {
    title: 'Project General Settings',
  };
});

const generalSettingsData = [
  {
    id: 'project-information',
    name: 'Project Information',
    description: 'View and edit project details',
  },
  {
    id: 'chat-widget-configurations',
    name: 'Chat Widget Configurations',
    description: 'Configure the chat widget settings',
  },
  {
    id: 'cookie-consent-settings',
    name: 'Cookie Consent Settings',
    description: 'Manage cookie consent preferences',
  },
];

export const Component = () => {
  const [navigation, setNavigation] = useState({
    level: 'index',
    item: '',
  });
  const [primaryBgColor, setPrimaryBgColor] = useState('#EEEEEE');
  const [primaryFgColor, setPrimaryFgColor] = useState('#FFA500');
  const [logoBadgeBgColor, setLogoBadgeBgColor] = useState('#555555');

  const renderProjectInformation = () => (
    <div className="space-y-6">
      <Card className="pt-6">
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label>Project Name</Label>
            <Input id="project-name" placeholder="Your Project Name" />
          </div>
          <div className="grid gap-2">
            <Label>Website URL</Label>
            <Input id="website-url" placeholder="https://www.yourwebsite.com" />
          </div>
          <div className="grid gap-2">
            <Label>Description</Label>
            <Input id="description" placeholder="Project Description" />
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save</Button>
        </CardFooter>
      </Card>
    </div>
  );

  const renderChatWidgetConfigurations = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-xs uppercase text-gray-500">Colors</h3>
        <Card className="pt-6">
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label>Primary Background Color</Label>

              <Input
                type="color"
                value={primaryBgColor}
                id="primary-bg-color"
                onChange={(e) => setPrimaryBgColor(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label>Primary Foreground Color</Label>

              <Input
                type="color"
                value={primaryFgColor}
                id="primary-fg-color"
                onChange={(e) => setPrimaryFgColor(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label>Logo Badge Background Color</Label>
              <Input
                type="color"
                value={logoBadgeBgColor}
                id="logo-badge-bg-color"
                placeholder="#000000"
                onChange={(e) => setLogoBadgeBgColor(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save</Button>
          </CardFooter>
        </Card>
      </div>

      <div className="space-y-2">
        <h3 className="text-xs uppercase text-gray-500">Images</h3>
        <Card className="pt-6">
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label>Logo Image</Label>
              <Input id="logo" type="file" />
            </div>
            <div className="grid gap-2">
              <Label>Banner Image</Label>
              <Input id="banner" type="file" />
            </div>
            <div className="grid gap-2">
              <Label>Promotional Image</Label>
              <Input id="promotional" type="file" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save</Button>
          </CardFooter>
        </Card>
      </div>

      <div className="space-y-2">
        <h3 className="text-xs uppercase text-gray-500">Contents</h3>
        <Card className="pt-6">
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label>Welcome Text</Label>
              <Input id="welcome-text" />
            </div>
            <div className="grid gap-2">
              <Label>CTA Text</Label>
              <Input id="cta-text" />
            </div>
            <div className="grid gap-2">
              <Label>Promotional Image Link</Label>
              <Input id="promotional-link" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );

  const renderCookieConsentSettings = () => (
    <div className="space-y-6">
      <Card className="pt-6">
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label>Cookie Banner Message</Label>
            <Input
              id="cookie-banner-message"
              placeholder="Your Cookie Banner Message"
            />
          </div>
          <div className="grid gap-2">
            <Label>Cookie Policy URL</Label>
            <Input
              id="cookie-policy-url"
              placeholder="https://www.yourwebsite.com/cookie-policy"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save</Button>
        </CardFooter>
      </Card>
    </div>
  );

  const renderDetailedContent = () => {
    switch (navigation.item) {
      case 'project-information':
        return renderProjectInformation();
      case 'chat-widget-configurations':
        return renderChatWidgetConfigurations();
      case 'cookie-consent-settings':
        return renderCookieConsentSettings();
      default:
        return (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-600">
                Content for {navigation.item} coming soon...
              </p>
            </CardContent>
          </Card>
        );
    }
  };

  if (navigation.level === 'detail') {
    return (
      <div>
        <PageHeader
          title={
            generalSettingsData.find((item) => item.id === navigation.item)
              ?.name ?? 'Detail'
          }
          icon={<ArrowLeft />}
          onToggleMobileNav={() => setNavigation({ level: 'index', item: '' })}
        />

        <div className="dashboard-container">
          <div className="w-full max-w-3xl">{renderDetailedContent()}</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <PageHeader title={'General Settings'} />

      <div className="dashboard-container">
        <div className="w-full max-w-3xl space-y-3">
          {generalSettingsData.map((item) => (
            <Card
              key={item.id}
              className="cursor-pointer transition-shadow hover:shadow-md"
            >
              <CardContent className="p-4">
                <button
                  onClick={() =>
                    setNavigation({ level: 'detail', item: item.id })
                  }
                  className="w-full text-left"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-600">
                        {item.description}
                      </p>
                    </div>
                    <ArrowRight className="size-4 text-gray-400" />
                  </div>
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};
