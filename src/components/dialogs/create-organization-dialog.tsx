import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

import { useState } from 'react';
import { CreateOrganizationForm } from "../forms/create-organization-form";
import HyperLink from "../ui/hyper-link";
import { Separator } from "../ui/separator";


export function CreateOrganizationDialog() {
  const [open, setOpen] = useState(false);

  const handleCloseDialog = () => {
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="w-full justify-start text-sm">
          <Plus className="mr-1" />
          New organization
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="mb-2 text-xl">Create Organization</DialogTitle>
          <DialogDescription className="pb-2 text-md">
             Organizations gather people building together.
            <br />
            <HyperLink href="" className="flex max-sm:justify-center">Learn more in PostHog Docs.</HyperLink>
          </DialogDescription>
          <Separator />
        </DialogHeader>
        <CreateOrganizationForm onClose={handleCloseDialog} />
      </DialogContent>
    </Dialog>
  );
}
