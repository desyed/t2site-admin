import { useChatWidgetStore } from '@/app/settings/chat-widget/chat-widget.store';
import { Button } from '@/components/site-button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ContentFormProps {
  handleBannerSave: () => void;
  handleCtaSave: () => void;
}

export const ContentForm = ({
  handleBannerSave,
  handleCtaSave,
}: ContentFormProps) => {
  const bannerTitle = useChatWidgetStore((s) => s.bannerTitle);
  const setBannerTitle = useChatWidgetStore((s) => s.setBannerTitle);
  const bannerSubtitle = useChatWidgetStore((s) => s.bannerSubtitle);
  const setBannerSubtitle = useChatWidgetStore((s) => s.setBannerSubtitle);

  const ctaTitle = useChatWidgetStore((s) => s.ctaTitle);
  const setCtaTitle = useChatWidgetStore((s) => s.setCtaTitle);
  const ctaSubtitle = useChatWidgetStore((s) => s.ctaSubtitle);
  const setCtaSubtitle = useChatWidgetStore((s) => s.setCtaSubtitle);
  const ctaDescription = useChatWidgetStore((s) => s.ctaDescription);
  const setCtaDescription = useChatWidgetStore((s) => s.setCtaDescription);
  const ctaButtonText = useChatWidgetStore((s) => s.ctaButtonText);
  const setCtaButtonText = useChatWidgetStore((s) => s.setCtaButtonText);

  const promotionalLink = useChatWidgetStore((s) => s.promotionalLink);
  const setPromotionalLink = useChatWidgetStore((s) => s.setPromotionalLink);

  return (
    <Card className="border-none shadow-none">
      <CardContent className="space-y-12 p-0">
        {/* Banner Content */}
        <div className="space-y-4">
          <div className="grid gap-2">
            <Label>Banner Title</Label>
            <Input
              value={bannerTitle}
              onChange={(e) => setBannerTitle(e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label>Banner Subtitle</Label>
            <Input
              value={bannerSubtitle}
              onChange={(e) => setBannerSubtitle(e.target.value)}
            />
          </div>

          <div className="flex justify-end">
            <Button onClick={handleBannerSave}>Save</Button>
          </div>
        </div>

        {/* CTA Content */}
        <div className="space-y-4">
          <div className="grid gap-2">
            <Label>CTA Title</Label>
            <Input
              value={ctaTitle}
              onChange={(e) => setCtaTitle(e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label>CTA Subtitle</Label>
            <Input
              value={ctaSubtitle}
              onChange={(e) => setCtaSubtitle(e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label>CTA Description</Label>
            <Input
              value={ctaDescription}
              onChange={(e) => setCtaDescription(e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label>CTA Button Text</Label>
            <Input
              value={ctaButtonText}
              onChange={(e) => setCtaButtonText(e.target.value)}
            />
          </div>

          <div className="flex justify-end">
            <Button onClick={handleCtaSave}>Save</Button>
          </div>
        </div>

        {/* Promotional Content */}
        <div className="space-y-4">
          <div className="grid gap-2">
            <Label>Promotion Link</Label>
            <Input
              value={promotionalLink}
              onChange={(e) => setPromotionalLink(e.target.value)}
            />
          </div>

          <div className="flex justify-end">
            <Button>Save</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
