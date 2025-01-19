import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { InfoIcon, UploadIcon } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

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
    console.log('Renaming organization to:', displayName);
  };

  const handleSaveLogo = () => {
    // TODO: Implement logo save logic
    console.log('Saving logo:', logo);
  };

  return (
    <div className="max-w-2xl">
      <div className="space-y-6">
        <Card >
          <CardHeader>
            <div className="flex items-center gap-2">
              <CardTitle>Display Name</CardTitle>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <InfoIcon className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Organization display name</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
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
          </CardContent>
        </Card>

        <Card >
          <CardHeader>
            <div className="flex items-center gap-2">
              <CardTitle>Logo</CardTitle>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <InfoIcon className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Organization logo</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
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
                className="cursor-pointer text-muted-foreground border-2 border-dashed rounded-lg p-4 hover:bg-accent/50 transition-colors"
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
                    <UploadIcon className="h-7 w-7 text-muted-foreground" />
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
