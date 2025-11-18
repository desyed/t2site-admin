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
}: ImagesFormProps) => {
  const logoInputRef = useRef<HTMLInputElement | null>(null);
  const bannerInputRef = useRef<HTMLInputElement | null>(null);

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

            {logoPreviewUrl && (
              <Button onClick={handleLogoSave}>Save Logo</Button>
            )}
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
              <Button onClick={handleBannerSave}>Save Banner</Button>
            )}
          </div>
        </div>

        <div className="grid gap-2">
          <Label>Promotional Image</Label>
          <Input id="promo" type="file" />
        </div>
      </CardContent>
    </Card>
  );
};
