import { Button } from '@/components/site-button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ContentFormProps {
  bannerTitle: string;
  setBannerTitle: (title: string) => void;
  bannerSubtitle: string;
  setBannerSubtitle: (subtitle: string) => void;
  ctaTitle: string;
  setCtaTitle: (title: string) => void;
  ctaSubtitle: string;
  setCtaSubtitle: (subtitle: string) => void;
  ctaDescription: string;
  setCtaDescription: (description: string) => void;
  ctaButtonText: string;
  setCtaButtonText: (buttonText: string) => void;
  promotionalTitle: string;
  setPromotionalTitle: (title: string) => void;
  promotionalLink: string;
  setPromotionalLink: (link: string) => void;
}

export const ContentForm = ({
  bannerTitle,
  setBannerTitle,
  bannerSubtitle,
  setBannerSubtitle,
  ctaTitle,
  setCtaTitle,
  ctaSubtitle,
  setCtaSubtitle,
  ctaDescription,
  setCtaDescription,
  ctaButtonText,
  setCtaButtonText,
  promotionalTitle,
  setPromotionalTitle,
  promotionalLink,
  setPromotionalLink,
}: ContentFormProps) => (
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

        <Button>Save</Button>
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

        <Button>Save</Button>
      </div>

      {/* Promotional Content */}
      <div className="space-y-4">
        <div className="grid gap-2">
          <Label>Promotional Card Title</Label>
          <Input
            value={promotionalTitle}
            onChange={(e) => setPromotionalTitle(e.target.value)}
          />
        </div>

        <div className="grid gap-2">
          <Label>Promotion Link</Label>
          <Input
            value={promotionalLink}
            onChange={(e) => setPromotionalLink(e.target.value)}
          />
        </div>

        <Button>Save</Button>
      </div>
    </CardContent>
  </Card>
);
