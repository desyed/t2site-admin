import { ArrowLeft, ChevronRight } from 'lucide-react';
import { useState, useMemo } from 'react';

import { PageHeader } from '@/components/dashboard/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { createDashboardLoader } from '@/middlewares/auth-middleware';

import type { WidgetConfig } from './helpers';

import ChatWidgetPreview from './_components/chat-widget-preview';
import { ColorsForm } from './_components/colors-form';
import { ContentForm } from './_components/content-form';
import { CookieConsentSettings } from './_components/cookie-consent-settings';
import { FaqForm } from './_components/faq-form';
import { ImagesForm } from './_components/images-form';
import { ProjectInformation } from './_components/project-information';
import { DEFAULTS, isValidHex } from './helpers';

export const loader = createDashboardLoader(() => ({
  title: 'Project General Settings',
}));

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

    if (
      !isValidHex(config.background) ||
      !isValidHex(config.foreground) ||
      !isValidHex(config.logoBadgeBackgroundColor)
    ) {
      setError('Please enter valid hex colors (e.g. #A1B2C3)');
      setSaving(false);
      return;
    }

    try {
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

  const renderDetailedContent = () => {
    switch (navigation.item) {
      case 'project-information':
        return <ProjectInformation />;

      case 'chat-widget-configurations':
        return (
          <div className="space-y-12">
            <ColorsForm
              primaryBgColor={primaryBgColor}
              primaryFgColor={primaryFgColor}
              logoBadgeBgColor={logoBadgeBgColor}
              setPrimaryBgColor={setPrimaryBgColor}
              setPrimaryFgColor={setPrimaryFgColor}
              setLogoBadgeBgColor={setLogoBadgeBgColor}
              handleSave={handleSave}
              saving={saving}
              error={error}
              success={success}
            />

            <ImagesForm />
            <ContentForm />
            <FaqForm />

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

      case 'cookie-consent-settings':
        return <CookieConsentSettings />;

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
      <PageHeader title="General Settings" />

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
