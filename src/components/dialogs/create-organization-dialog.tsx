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
import { CreateOrganizationForm, CreateOrganizationFormData } from "../forms/create-organization-form";
import HyperLink from "../ui/hyper-link";
import { Separator } from "../ui/separator";


export function CreateOrganizationDialog() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: CreateOrganizationFormData) => {
    try {
      setIsLoading(true);
      // Add your API call here to create the organization
      console.log('Creating organization:', data);

      // Close the dialog after successful creation
      setOpen(false);
    } catch (error) {
      console.error('Error creating organization:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-full justify-start">
          <Plus className="mr-2 h-4 w-4 " />
          New organization
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="mb-2">Create Organization</DialogTitle>
          <DialogDescription className="pb-2">
             Organizations gather people building together.
            <br />
            <HyperLink href="">Learn more in PostHog Docs.</HyperLink>
          </DialogDescription>
          <Separator />
        </DialogHeader>
        <CreateOrganizationForm onSubmit={handleSubmit} isLoading={isLoading} />
      </DialogContent>
    </Dialog>
  );
}
