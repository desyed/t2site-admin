import { X } from 'lucide-react';
import { useRef } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ImagesFormProps {
  logoPreviewUrl: string;
  handleLogoChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleLogoSave: () => void;
  handleLogoReset: () => void;
  bannerPreviewUrl: string;
  handleBannerChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleBannerSave: () => void;
  handleBannerReset: () => void;
  promotionalImagePreviewUrl: string;
  handlePromotionalImageChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handlePromotionalImageSave: () => void;
  handlePromotionalImageReset: () => void;
}

export const ImagesForm = ({
  logoPreviewUrl,
  handleLogoChange,
  handleLogoSave,
  handleLogoReset,
  bannerPreviewUrl,
  handleBannerChange,
  handleBannerSave,
  handleBannerReset,
  promotionalImagePreviewUrl,
  handlePromotionalImageChange,
  handlePromotionalImageSave,
  handlePromotionalImageReset,
}: ImagesFormProps) => {
  const logoInputRef = useRef<HTMLInputElement | null>(null);
  const bannerInputRef = useRef<HTMLInputElement | null>(null);
  const promotionalImageInputRef = useRef<HTMLInputElement | null>(null);

  const clearInput = (
    targetedFileRef: React.RefObject<HTMLInputElement | null>
  ) => {
    if (targetedFileRef.current) {
      targetedFileRef.current.value = '';
    }
  };

  return (
    <Card className="border-none shadow-none">
      <CardContent className="space-y-4 p-0">
        <div className="grid gap-2">
          <Label>Logo Image</Label>
          <div className="flex items-center gap-2">
            {logoPreviewUrl && (
              <div className="relative">
                <Button
                  variant="destructive"
                  className="absolute -right-1 -top-1 size-4 rounded-full p-0"
                  onClick={() => {
                    handleLogoReset();
                    clearInput(logoInputRef);
                  }}
                >
                  <X />
                </Button>
                <div className="flex size-10 flex-col items-center justify-center overflow-hidden rounded border border-gray-300">
                  <img
                    src={logoPreviewUrl}
                    alt="logo"
                    className="w-full object-contain"
                  />
                </div>
              </div>
            )}
            <Input
              ref={logoInputRef}
              onChange={handleLogoChange}
              id="logo"
              type="file"
            />

            {logoPreviewUrl && <Button onClick={handleLogoSave}>Save</Button>}
          </div>
        </div>

        <div className="grid gap-2">
          <Label>Banner Image</Label>
          <div className="flex items-center gap-2">
            {bannerPreviewUrl && (
              <div className="relative">
                <Button
                  variant="destructive"
                  className="absolute -right-1 -top-1 size-4 rounded-full p-0"
                  onClick={() => {
                    handleBannerReset();
                    clearInput(bannerInputRef);
                  }}
                >
                  <X />
                </Button>
                <div className="flex size-10 flex-col items-center justify-center overflow-hidden rounded border border-gray-300">
                  <img
                    src={bannerPreviewUrl}
                    alt="banner"
                    className="w-full object-contain"
                  />
                </div>
              </div>
            )}
            <Input
              ref={bannerInputRef}
              onChange={handleBannerChange}
              id="banner"
              type="file"
            />

            {bannerPreviewUrl && (
              <Button onClick={handleBannerSave}>Save</Button>
            )}
          </div>
        </div>

        <div className="grid gap-2">
          <Label>Promotional Image</Label>
          <div className="flex items-center gap-2">
            {promotionalImagePreviewUrl && (
              <div className="relative">
                <Button
                  variant="destructive"
                  className="absolute -right-1 -top-1 size-4 rounded-full p-0"
                  onClick={() => {
                    handlePromotionalImageReset();
                    clearInput(promotionalImageInputRef);
                  }}
                >
                  <X />
                </Button>
                <div className="flex size-10 flex-col items-center justify-center overflow-hidden rounded border border-gray-300">
                  <img
                    src={promotionalImagePreviewUrl}
                    alt="promotional"
                    className="w-full object-contain"
                  />
                </div>
              </div>
            )}
            <Input
              ref={promotionalImageInputRef}
              onChange={handlePromotionalImageChange}
              id="promotional"
              type="file"
            />

            {promotionalImagePreviewUrl && (
              <Button onClick={handlePromotionalImageSave}>Save</Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
