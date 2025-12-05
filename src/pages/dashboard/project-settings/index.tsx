import { ArrowLeft, ChevronRight } from 'lucide-react';
import { useState, useMemo, useEffect } from 'react';
import { toast } from 'sonner';

import type { WidgetConfig } from '@/app/settings/chat-widget/chat-widget.store';

import { useCurrentProjectQuery } from '@/app/project/project.hooks';
import {
  useUpdateChatWidgetColors,
  useUpdateChatWidgetBanner,
  useUpdateChatWidgetCta,
  useUpdateChatWidgetLogo,
  useUpdateChatWidgetBannerImage,
  useUpdateChatWidgetPromotionalImage,
} from '@/app/settings/chat-widget/chat-widget.hooks';
import {
  useChatWidgetStore,
  type ChatWidgetStore,
} from '@/app/settings/chat-widget/chat-widget.store';
import { PageHeader } from '@/components/dashboard/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { createDashboardLoader } from '@/middlewares/auth-middleware';

import ChatWidgetPreview from './_components/chat-widget-preview';
import { ColorsForm } from './_components/colors-form';
import { ContentForm } from './_components/content-form';
import { CookieConsentSettings } from './_components/cookie-consent-settings';
import { FaqForm } from './_components/faq-form';
import { ImagesForm } from './_components/images-form';
import { ProjectInformation } from './_components/project-information';
import { hslStringToHex, isValidHex } from './helpers';

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

  const { data: currentProject } = useCurrentProjectQuery();
  const liveDeskId = currentProject?.features?.liveDesk.id ?? '';

  // colors
  const background = useChatWidgetStore((s: ChatWidgetStore) => s.background);
  const foreground = useChatWidgetStore((s: ChatWidgetStore) => s.foreground);
  const logoBadgeBackgroundColor = useChatWidgetStore(
    (s: ChatWidgetStore) => s.logoBadgeBackgroundColor
  );

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
  const resetBannerImage = useChatWidgetStore(
    (s: ChatWidgetStore) => s.resetBanner
  );
  const resetPromotionalImage = useChatWidgetStore(
    (s: ChatWidgetStore) => s.resetPromotionalImage
  );

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

  const setBackground = useChatWidgetStore((s) => s.setBackground);
  const setForeground = useChatWidgetStore((s) => s.setForeground);
  const setLogoBadgeBackgroundColor = useChatWidgetStore(
    (s) => s.setLogoBadgeBackgroundColor
  );

  const setBannerTitle = useChatWidgetStore((s) => s.setBannerTitle);
  const setBannerSubtitle = useChatWidgetStore((s) => s.setBannerSubtitle);

  const setCtaTitle = useChatWidgetStore((s) => s.setCtaTitle);
  const setCtaSubtitle = useChatWidgetStore((s) => s.setCtaSubtitle);
  const setCtaDescription = useChatWidgetStore((s) => s.setCtaDescription);
  const setCtaButtonText = useChatWidgetStore((s) => s.setCtaButtonText);

  const setLogoFromApi = useChatWidgetStore((s) => s.setLogoFileAndPreview);
  const setBannerFromApi = useChatWidgetStore((s) => s.setBannerFileAndPreview);
  const setPromoFromApi = useChatWidgetStore(
    (s) => s.setPromotionalFileAndPreview
  );

  const setSaving = useChatWidgetStore((s: ChatWidgetStore) => s.setSaving);
  const setError = useChatWidgetStore((s: ChatWidgetStore) => s.setError);
  const setSuccess = useChatWidgetStore((s: ChatWidgetStore) => s.setSuccess);

  useEffect(() => {
    if (!currentProject?.features?.liveDesk) return;

    const liveDesk = currentProject.features.liveDesk;

    if (liveDesk.theme) {
      setBackground(hslStringToHex(liveDesk.theme.background ?? '#FFFCE8'));
      setForeground(hslStringToHex(liveDesk.theme.foreground ?? '#000000'));
      setLogoBadgeBackgroundColor(
        hslStringToHex(liveDesk.theme.logoBadgeBackgroundColor ?? '#FCE654')
      );
    }

    if (liveDesk.banner) {
      setBannerTitle(liveDesk.banner.title ?? '');
      setBannerSubtitle(liveDesk.banner.subtitle ?? '');
    }

    if (liveDesk.cta) {
      setCtaTitle(liveDesk.cta.title ?? '');
      setCtaSubtitle(liveDesk.cta.subtitle ?? '');
      setCtaDescription(liveDesk.cta.description ?? '');
      setCtaButtonText(liveDesk.cta.buttonText ?? '');
    }

    if (liveDesk.logo) {
      setLogoFromApi(null, liveDesk.logo);
    }
    if (liveDesk.bannerImage) {
      setBannerFromApi(null, liveDesk.bannerImage);
    }
    if (liveDesk.promotionalImage) {
      setPromoFromApi(null, liveDesk.promotionalImage);
    }
  }, [
    currentProject,
    setBackground,
    setForeground,
    setLogoBadgeBackgroundColor,
    setBannerTitle,
    setBannerSubtitle,
    setCtaTitle,
    setCtaSubtitle,
    setCtaDescription,
    setCtaButtonText,
    setLogoFromApi,
    setBannerFromApi,
    setPromoFromApi,
  ]);

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

  // --- API mutations ---
  const updateColors = useUpdateChatWidgetColors();
  const updateBanner = useUpdateChatWidgetBanner();
  const updateCta = useUpdateChatWidgetCta();
  const updateLogo = useUpdateChatWidgetLogo();
  const updateBannerImage = useUpdateChatWidgetBannerImage();
  const updatePromotionalImage = useUpdateChatWidgetPromotionalImage();

  const handleColorSave = async (
    hslBackground: string,
    hslForeground: string,
    hslBadge: string
  ) => {
    setSaving(true);
    setError(null);
    setSuccess(null);

    if (
      !isValidHex(config.background) ||
      !isValidHex(config.foreground) ||
      !isValidHex(config.logoBadgeBackgroundColor)
    ) {
      setError('Please enter valid hex color codes.');
      setSaving(false);
      return;
    }

    try {
      await updateColors.mutateAsync({
        liveDeskId,
        payload: {
          background: hslBackground,
          foreground: hslForeground,
          primary: hslBackground,
          primaryForeground: hslForeground,
          logoBadgeBackgroundColor: hslBadge,
        },
      });
      setSuccess('Saved successfully!');
    } catch (e: any) {
      const msg = e?.message ?? 'Failed to save colors.';
      toast.error(msg);
      setError(msg);
    } finally {
      setSaving(false);
    }
  };

  const handleBannerSave = async () => {
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      await updateBanner.mutateAsync({
        liveDeskId,
        payload: {
          title: bannerTitle,
          subtitle: bannerSubtitle,
        },
      });
      setSuccess('Banner saved!');
    } catch (e: any) {
      const msg = e?.message ?? 'Failed to save banner.';
      toast.error(msg);
      setError(msg);
    } finally {
      setSaving(false);
    }
  };

  const handleCtaSave = async () => {
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      await updateCta.mutateAsync({
        liveDeskId,
        payload: {
          title: ctaTitle,
          subtitle: ctaSubtitle,
          description: ctaDescription,
          buttonText: ctaButtonText,
        },
      });
      setSuccess('CTA saved!');
    } catch (e: any) {
      const msg = e?.message ?? 'Failed to save CTA.';
      toast.error(msg);
      setError(msg);
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

  const handleBannerImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleLogoSave = async () => {
    const file = useChatWidgetStore.getState().images.logoFile;
    if (!file) return toast.error('Please select a logo image first.');

    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await updateLogo.mutateAsync({
        liveDeskId,
        file,
      });

      const uploadedUrl = res?.data?.logo ?? null;
      setLogoFileAndPreview(null, uploadedUrl);
      setSuccess('Logo updated!');
      toast.success('Logo updated!');
    } catch (err: any) {
      const message =
        err?.response?.data?.message ??
        err?.message ??
        'Failed to update logo.';

      toast.error(message);
      setError(message);
    } finally {
      setSaving(false);
    }
  };

  const handleBannerImageSave = async () => {
    const file = useChatWidgetStore.getState().images.bannerFile;
    if (!file) return toast.error('Please select a banner first.');

    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await updateBannerImage.mutateAsync({
        liveDeskId,
        file,
      });
      const uploadedUrl = res?.data?.bannerImage ?? null;

      setBannerFileAndPreview(null, uploadedUrl);
      setSuccess('Banner updated!');
      toast.success('Banner updated!');
    } catch (err: any) {
      const message =
        err?.response?.data?.message ??
        err?.message ??
        'Failed to upload banner.';
      toast.error(message);
      setError(message);
    } finally {
      setSaving(false);
    }
  };

  const handlePromotionalImageSave = async () => {
    const file = useChatWidgetStore.getState().images.promotionalImageFile;
    if (!file) return toast.error('Please select a promotional image first.');

    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await updatePromotionalImage.mutateAsync({
        liveDeskId,
        file,
      });

      const uploadedUrl = res?.data?.promotionalImage ?? null;

      setPromotionalFileAndPreview(null, uploadedUrl);
      setSuccess('Promotional image updated!');
      toast.success('Promotional image updated!');
    } catch (err: any) {
      const message =
        err?.response?.data?.message ??
        err?.message ??
        'Failed to upload promotional image.';
      toast.error(message);
      setError(message);
    } finally {
      setSaving(false);
    }
  };

  const handleLogoReset = () => {
    resetLogo();
  };

  const handleBannerImageReset = () => {
    resetBannerImage();
  };

  const handlePromotionalImageReset = () => {
    resetPromotionalImage();
  };

  const renderDetailedContent = () => {
    switch (navigation.item) {
      case 'project-information':
        return <ProjectInformation />;

      case 'chat-widget-configurations':
        return (
          <div className="space-y-12">
            <Tabs defaultValue="appearance" className="space-y-12">
              <TabsList>
                <TabsTrigger value="appearance" className="px-8">
                  Appearance
                </TabsTrigger>
                <TabsTrigger value="faq" className="px-8">
                  FAQ
                </TabsTrigger>
              </TabsList>
              <TabsContent value="appearance">
                <ContentForm
                  handleBannerSave={handleBannerSave}
                  handleCtaSave={handleCtaSave}
                />

                <ColorsForm handleSave={handleColorSave} />

                <ImagesForm
                  handleLogoChange={handleLogoChange}
                  handleLogoSave={handleLogoSave}
                  handleLogoReset={handleLogoReset}
                  handleBannerChange={handleBannerImageChange}
                  handleBannerSave={handleBannerImageSave}
                  handleBannerReset={handleBannerImageReset}
                  handlePromotionalImageChange={handlePromotionalImageChange}
                  handlePromotionalImageSave={handlePromotionalImageSave}
                  handlePromotionalImageReset={handlePromotionalImageReset}
                />
              </TabsContent>
              <TabsContent value="faq">
                <FaqForm />
              </TabsContent>
            </Tabs>

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
