import { ArrowLeft, ChevronRight } from 'lucide-react';
import { useState, useMemo } from 'react';

import type { WidgetConfig } from '@/app/settings/chat-widget/chat-widget.store';

import {
  useChatWidgetStore,
  type ChatWidgetStore,
} from '@/app/settings/chat-widget/chat-widget.store';
import { PageHeader } from '@/components/dashboard/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { createDashboardLoader } from '@/middlewares/auth-middleware';

import ChatWidgetPreview from './_components/chat-widget-preview';
import { ColorsForm } from './_components/colors-form';
import { ContentForm } from './_components/content-form';
import { CookieConsentSettings } from './_components/cookie-consent-settings';
import { FaqForm } from './_components/faq-form';
import { ImagesForm } from './_components/images-form';
import { ProjectInformation } from './_components/project-information';
import { isValidHex } from './helpers';

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

  // colors
  const background = useChatWidgetStore((s: ChatWidgetStore) => s.background);
  const foreground = useChatWidgetStore((s: ChatWidgetStore) => s.foreground);
  const logoBadgeBackgroundColor = useChatWidgetStore(
    (s: ChatWidgetStore) => s.logoBadgeBackgroundColor
  );

  // const [primaryBgColor, setPrimaryBgColor] = useState(DEFAULTS.background);
  // const [primaryFgColor, setPrimaryFgColor] = useState(DEFAULTS.foreground);
  // const [logoBadgeBgColor, setLogoBadgeBgColor] = useState(
  //   DEFAULTS.logoBadgeBackgroundColor
  // );

  // Image previews + actions
  const logoPreviewUrl =
    useChatWidgetStore((s: ChatWidgetStore) => s.images.logoPreviewUrl) ?? null;
  const bannerPreviewUrl =
    useChatWidgetStore((s: ChatWidgetStore) => s.images.bannerPreviewUrl) ??
    null;
  const promotionalImagePreviewUrl =
    useChatWidgetStore(
      (s: ChatWidgetStore) => s.images.promotionalImagePreviewUrl
    ) ?? null;

  const setLogoFileAndPreview = useChatWidgetStore(
    (s: ChatWidgetStore) => s.setLogoFileAndPreview
  );
  const setBannerFileAndPreview = useChatWidgetStore(
    (s: ChatWidgetStore) => s.setBannerFileAndPreview
  );
  const setPromotionalFileAndPreview = useChatWidgetStore(
    (s: ChatWidgetStore) => s.setPromotionalFileAndPreview
  );

  const resetLogo = useChatWidgetStore((s: ChatWidgetStore) => s.resetLogo);
  const resetBanner = useChatWidgetStore((s: ChatWidgetStore) => s.resetBanner);
  const resetPromotionalImage = useChatWidgetStore(
    (s: ChatWidgetStore) => s.resetPromotionalImage
  );

  // const [logoPreviewUrl, setLogoPreviewUrl] = useState<string | null>(null);
  // const [logoFile, setLogoFile] = useState<File | null>(null);

  // const [bannerPreviewUrl, setBannerPreviewUrl] = useState<string | null>(null);
  // const [bannerFile, setBannerFile] = useState<File | null>(null);

  // const [promotionalImagePreviewUrl, setPromotionalImagePreviewUrl] = useState<
  //   string | null
  // >(null);
  // const [promotionalImageFile, setPromotionalImageFile] = useState<File | null>(
  //   null
  // );

  // Content fields
  const bannerTitle = useChatWidgetStore((s: ChatWidgetStore) => s.bannerTitle);
  const bannerSubtitle = useChatWidgetStore(
    (s: ChatWidgetStore) => s.bannerSubtitle
  );
  const ctaTitle = useChatWidgetStore((s: ChatWidgetStore) => s.ctaTitle);
  const ctaSubtitle = useChatWidgetStore((s: ChatWidgetStore) => s.ctaSubtitle);
  const ctaDescription = useChatWidgetStore(
    (s: ChatWidgetStore) => s.ctaDescription
  );
  const ctaButtonText = useChatWidgetStore(
    (s: ChatWidgetStore) => s.ctaButtonText
  );

  const promotionalLink = useChatWidgetStore(
    (s: ChatWidgetStore) => s.promotionalLink
  );

  // const [bannerTitle, setBannerTitle] = useState(DEFAULTS.bannerTitle);
  // const [bannerSubtitle, setBannerSubtitle] = useState(DEFAULTS.bannerSubtitle);

  // const [ctaTitle, setCtaTitle] = useState(DEFAULTS.ctaTitle);
  // const [ctaSubtitle, setCtaSubtitle] = useState(DEFAULTS.ctaSubtitle);
  // const [ctaDescription, setCtaDescription] = useState(DEFAULTS.ctaDescription);
  // const [ctaButtonText, setCtaButtonText] = useState(DEFAULTS.ctaButtonText);
  // const [promotionalTitle, setPromotionalTitle] = useState(
  //   DEFAULTS.promotionalTitle
  // );
  // const [promotionalLink, setPromotionalLink] = useState(
  //   DEFAULTS.promotionalLink
  // );

  const setSaving = useChatWidgetStore((s: ChatWidgetStore) => s.setSaving);
  const setError = useChatWidgetStore((s: ChatWidgetStore) => s.setError);
  const setSuccess = useChatWidgetStore((s: ChatWidgetStore) => s.setSuccess);

  // const [saving, setSaving] = useState(false);
  // const [error, setError] = useState<string | null>(null);
  // const [success, setSuccess] = useState<string | null>(null);

  const config: WidgetConfig = useMemo(
    () => ({
      background,
      foreground,
      logoBadgeBackgroundColor,
      bannerTitle,
      bannerSubtitle,
      ctaTitle,
      ctaSubtitle,
      ctaDescription,
      ctaButtonText,
      promotionalLink,
    }),
    [
      background,
      foreground,
      logoBadgeBackgroundColor,
      bannerTitle,
      bannerSubtitle,
      ctaTitle,
      ctaSubtitle,
      ctaDescription,
      ctaButtonText,
      promotionalLink,
    ]
  );

  const handleColorSave = async () => {
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

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (file) {
      const preview = URL.createObjectURL(file);
      setLogoFileAndPreview(file, preview);
    }
  };

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (file) {
      const preview = URL.createObjectURL(file);
      setBannerFileAndPreview(file, preview);
    }
  };

  const handlePromotionalImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0] ?? null;
    if (file) {
      const preview = URL.createObjectURL(file);
      setPromotionalFileAndPreview(file, preview);
    }
  };

  const handleLogoReset = () => {
    resetLogo();
  };

  const handleBannerReset = () => {
    resetBanner();
  };

  const handlePromotionalImageReset = () => {
    resetPromotionalImage();
  };

  const handleLogoSave = async () => {
    const file = useChatWidgetStore.getState().images.logoFile;
    if (!file) return alert('Please select a logo first.');

    const formData = new FormData();
    formData.append('logo', file);

    await fetch('/api/update-logo', {
      method: 'POST',
      body: formData,
    });

    alert('Logo saved!');
  };

  const handleBannerSave = async () => {
    const file = useChatWidgetStore.getState().images.bannerFile;
    if (!file) return alert('Please select a banner first.');

    const formData = new FormData();
    formData.append('banner', file);

    await fetch('/api/update-banner', {
      method: 'POST',
      body: formData,
    });

    alert('Banner saved!');
  };

  const handlePromotionalImageSave = async () => {
    const file = useChatWidgetStore.getState().images.promotionalImageFile;
    if (!file) return alert('Please select a promotional image first.');

    const formData = new FormData();
    formData.append('promotionalImage', file);

    await fetch('/api/update-promotional-image', {
      method: 'POST',
      body: formData,
    });

    alert('Promotional image saved!');
  };

  const renderDetailedContent = () => {
    switch (navigation.item) {
      case 'project-information':
        return <ProjectInformation />;

      case 'chat-widget-configurations':
        return (
          <div className="space-y-12">
            <ContentForm />

            <FaqForm />

            <ColorsForm handleSave={handleColorSave} />

            <ImagesForm
              handleLogoChange={handleLogoChange}
              handleLogoSave={handleLogoSave}
              handleLogoReset={handleLogoReset}
              handleBannerChange={handleBannerChange}
              handleBannerSave={handleBannerSave}
              handleBannerReset={handleBannerReset}
              handlePromotionalImageChange={handlePromotionalImageChange}
              handlePromotionalImageSave={handlePromotionalImageSave}
              handlePromotionalImageReset={handlePromotionalImageReset}
            />

            <div
              className="fixed bottom-5 right-14"
              style={
                {
                  '--chat-bg': config.background,
                  '--chat-fg': config.foreground,
                  '--chat-badge': config.logoBadgeBackgroundColor,
                } as React.CSSProperties
              }
            >
              <ChatWidgetPreview
                logoPreviewUrl={logoPreviewUrl ?? ''}
                bannerPreviewUrl={bannerPreviewUrl ?? ''}
                promotionalImagePreviewUrl={promotionalImagePreviewUrl ?? ''}
                bannerTitle={bannerTitle}
                bannerSubtitle={bannerSubtitle}
                ctaTitle={ctaTitle}
                ctaSubtitle={ctaSubtitle}
                ctaDescription={ctaDescription}
                ctaButtonText={ctaButtonText}
                promotionalLink={promotionalLink}
              />
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
