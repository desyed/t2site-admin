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
import { CreateProjectForm } from './create-project-form';

export function CreateProjectDialog() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start text-sm"
          icon={<Plus className="mr-1 size-4" />}
          iconPosition="left"
        >
          New project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="mb-1 text-xl">Create Project</DialogTitle>
          <DialogDescription className="text-md pb-2">
            Projects help you organize and track your work efficiently.
            <br />
            <div className="flex">
              <HyperLink href="" className="flex max-sm:justify-center">
                Learn more about projects
              </HyperLink>
            </div>
          </DialogDescription>
          <Separator />
        </DialogHeader>
        <CreateProjectForm />
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
