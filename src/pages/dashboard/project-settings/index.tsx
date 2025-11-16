import { ArrowLeft, ChevronRight } from 'lucide-react';
import { useMemo, useState } from 'react';

import { PageHeader } from '@/components/dashboard/page-header';
import { Button } from '@/components/site-button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createDashboardLoader } from '@/middlewares/auth-middleware';

import ChatWidgetPreview from './general/_components/chat-widget-preview';
import { FaqForm } from './general/_components/faq-form';

type WidgetConfig = {
  background: string;
  foreground: string;
  logoBadgeBackgroundColor: string;
};

const DEFAULTS: WidgetConfig = {
  background: '#FFFCE8',
  foreground: '#000000',
  logoBadgeBackgroundColor: '#FCE654',
};

// Small helper to keep color input tidy
const normalizeHex = (value: string) => {
  const v = value.trim();
  if (!v) return '';
  if (v.startsWith('#')) return v.slice(0, 7);
  return `#${v}`.slice(0, 7);
};

const isValidHex = (value: string) => /^#([\dA-Fa-f]{6})$/.test(value);

export const loader = createDashboardLoader(() => {
  return {
    title: 'Project General Settings',
  };
});

const generalSettingsData = [
  {
    id: 'project-information',
    name: 'Project Information',
    description:
      'Easily review and update your project details to keep everything accurate.',
  },
  {
    id: 'chat-widget-configurations',
    name: 'Chat Widget Configurations',
    description:
      'Customize your chat widget so it looks great and works the way you want.',
  },
  {
    id: 'cookie-consent-settings',
    name: 'Cookie Consent Settings',
    description:
      'Manage how your visitors see and control cookie permissions on your site.',
  },
];

export const Component = () => {
  const [navigation, setNavigation] = useState({
    level: 'index',
    item: '',
  });

  const [primaryBgColor, setPrimaryBgColor] = useState(DEFAULTS.background);
  const [primaryFgColor, setPrimaryFgColor] = useState(DEFAULTS.foreground);
  const [logoBadgeBgColor, setLogoBadgeBgColor] = useState(
    DEFAULTS.logoBadgeBackgroundColor
  );

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const config: WidgetConfig = useMemo(
    () => ({
      background: primaryBgColor,
      foreground: primaryFgColor,
      logoBadgeBackgroundColor: logoBadgeBgColor,
    }),
    [primaryBgColor, primaryFgColor, logoBadgeBgColor]
  );

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setSuccess(null);

    // Validate before submit
    if (
      !isValidHex(config.background) ||
      !isValidHex(config.foreground) ||
      !isValidHex(config.logoBadgeBackgroundColor)
    ) {
      setError('Please enter valid 6-digit hex colors, e.g. #A1B2C3.');
      setSaving(false);
      return;
    }

    try {
      // Replace with your API endpoint + auth
      const res = await fetch('/api/chat-widget/config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      });
      if (!res.ok) throw new Error(`Failed with status ${res.status}`);
      setSuccess('Saved successfully!');
    } catch (e: any) {
      setError(e?.message ?? 'Failed to save configuration.');
    } finally {
      setSaving(false);
    }
  };

  const renderProjectInformation = () => (
    <div className="space-y-12">
      <Card className="border-none shadow-none">
        <CardContent className="space-y-4 p-0">
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

          <Button>Save</Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderChatWidgetConfigurations = () => (
    <div>
      <div className="space-y-12">
        <div className="space-y-4">
          <h3 className="text-[12px] uppercase text-gray-500">Colors</h3>
          <Card className="border-none shadow-none">
            <CardContent className="space-y-4 p-0">
              <div className="grid gap-2">
                <Label>Primary Background Color</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="color"
                    value={primaryBgColor}
                    id="primary-bg-color"
                    onChange={(e) =>
                      setPrimaryBgColor(normalizeHex(e.target.value))
                    }
                    className="w-12 p-1.5"
                  />
                  <Input
                    type="text"
                    value={primaryBgColor}
                    onChange={(e) =>
                      setPrimaryBgColor(normalizeHex(e.target.value))
                    }
                    placeholder="#FFFFFF"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label>Primary Foreground Color</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="color"
                    value={primaryFgColor}
                    id="primary-fg-color"
                    onChange={(e) =>
                      setPrimaryFgColor(normalizeHex(e.target.value))
                    }
                    className="w-12 p-1.5"
                  />
                  <Input
                    type="text"
                    value={primaryFgColor}
                    onChange={(e) =>
                      setPrimaryFgColor(normalizeHex(e.target.value))
                    }
                    placeholder="#FFA500"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label>Logo Badge Background Color</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="color"
                    value={logoBadgeBgColor}
                    id="logo-badge-bg-color"
                    placeholder="#000000"
                    onChange={(e) =>
                      setLogoBadgeBgColor(normalizeHex(e.target.value))
                    }
                    className="w-12 p-1.5"
                  />
                  <Input
                    type="text"
                    value={logoBadgeBgColor}
                    onChange={(e) =>
                      setLogoBadgeBgColor(normalizeHex(e.target.value))
                    }
                    placeholder="#471515"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3">
                <Button
                  onClick={handleSave}
                  disabled={saving}
                  className="rounded bg-black px-4 py-2 text-white disabled:opacity-60"
                >
                  {saving ? 'Saving…' : 'Save'}
                </Button>
                {error && <span className="text-sm text-red-600">{error}</span>}
                {success && (
                  <span className="text-sm text-green-600">{success}</span>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <h3 className="text-[12px] uppercase text-gray-500">Images</h3>
          <Card className="border-none shadow-none">
            <CardContent className="space-y-4 p-0">
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
          </Card>
        </div>

        <div className="space-y-4">
          <h3 className="text-[12px] uppercase text-gray-500">Contents</h3>
          <Card className="border-none shadow-none">
            <CardContent className="space-y-4 p-0">
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
          </Card>
        </div>

        <div className="space-y-4">
          <FaqForm />
        </div>
      </div>

      <div
        className="fixed bottom-20 right-20"
        style={
          {
            '--chat-bg': config.background,
            '--chat-fg': config.foreground,
            '--chat-badge': config.logoBadgeBackgroundColor,
          } as React.CSSProperties
        }
      >
        <ChatWidgetPreview />
      </div>
    </div>
  );

  const renderCookieConsentSettings = () => (
    <div className="space-y-12">
      <Card className="border-none shadow-none">
        <CardContent className="space-y-4 p-0">
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

          <Button>Save</Button>
        </CardContent>
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
          <div className="w-full lg:w-1/2">{renderDetailedContent()}</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <PageHeader title={'General Settings'} />

      <div className="dashboard-container">
        <div className="w-full space-y-3 lg:w-1/2">
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
                      <p className="text-sm text-gray-400">
                        {item.description}
                      </p>
                    </div>
                    {/* <ArrowRight  /> */}
                    <ChevronRight className="w-5 text-gray-400" />
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
