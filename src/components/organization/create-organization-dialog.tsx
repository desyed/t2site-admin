import { Plus } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/site-button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import HyperLink from '../ui/hyper-link';
import { Separator } from '../ui/separator';
import { CreateOrganizationForm } from './create-organization-form';

export type CreateOrganizationDialogProps = {
  openFromParent?: boolean;
  setOpenFromParent?: (open: boolean) => void;
};

export function CreateOrganizationDialog({
  openFromParent,
  setOpenFromParent,
}: CreateOrganizationDialogProps) {
  const [open, setOpen] = useState(false);

  const handleCloseDialog = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={openFromParent ?? open}
      onOpenChange={setOpenFromParent ?? setOpen}
    >
      {openFromParent === undefined ? (
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-sm"
          >
            <Plus className="mr-1" />
            New organization
          </Button>
        </DialogTrigger>
      ) : null}
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="mb-1 text-xl">
            Create Organization
          </DialogTitle>
          <DialogDescription className="text-md pb-2">
            Organizations gather people building together.
            <br />
            <div className="flex">
              <HyperLink href="" className="flex max-sm:justify-center">
                Learn more in T2Site Docs.
              </HyperLink>
            </div>
          </DialogDescription>
          <Separator />
        </DialogHeader>
        <CreateOrganizationForm onClose={handleCloseDialog} />
        <div className="my-2">
          <p className="text-sm text-muted-foreground">
            Continuing will start a monthly Pro plan subscription.
          </p>
          <HyperLink href="" className="flex max-sm:justify-center">
            Learn More
          </HyperLink>
        </div>
      </DialogContent>
    </Dialog>
  );
}
