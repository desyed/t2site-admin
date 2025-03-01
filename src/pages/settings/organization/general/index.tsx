import { UploadIcon } from 'lucide-react';
import { useState } from 'react';

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/site-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { logDev } from '@/lib/utils';

export async function loader() {
  return [];
}

export function Component() {
  const [displayName, setDisplayName] = useState('');
  const [logo, setLogo] = useState<File | null>(null);

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setLogo(event.target.files[0]);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      setLogo(event.dataTransfer.files[0]);
    }
  };

  const handleRenameOrganization = () => {
    // TODO: Implement organization rename logic
    logDev('Renaming organization to:', displayName);
  };

  const handleSaveLogo = () => {
    // TODO: Implement logo save logic
    logDev('Saving logo:', logo);
  };

  return (
    <div className="max-w-2xl">
      <title>Settings | Organization - General</title>
      <div className="space-y-10">
        <div className="space-y-4 border-none p-0">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold">Display Name</h2>
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="orgName">Organization name</Label>
              <Input
                id="orgName"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Enter organization name"
              />
            </div>
            <Button onClick={handleRenameOrganization} variant="default">
              Rename organization
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold">Logo</h2>
          </div>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Avatar className="size-16">
                {logo && (
                  <AvatarImage
                    src={URL.createObjectURL(logo)}
                    alt="Organization logo"
                  />
                )}
                <AvatarFallback className="text-2xl">A</AvatarFallback>
              </Avatar>
              <Label
                htmlFor="logo"
                className="cursor-pointer rounded-lg border-2 border-dashed p-4 text-muted-foreground transition-colors hover:bg-accent/50"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <Input
                  id="logo"
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
                <div className="flex items-center gap-2">
                  <UploadIcon className="size-7 text-muted-foreground" />
                  <div>
                    <p>Click or drag and drop to upload logo image</p>
                    <p className="text-sm text-muted-foreground">
                      (192×192 px or larger)
                    </p>
                  </div>
                </div>
              </Label>
            </div>
            <Button onClick={handleSaveLogo} variant="default">
              Save logo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
