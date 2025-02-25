import { useState } from 'react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface DeleteProjectAlertProps {
  children: React.ReactNode;
}

export const DeleteProjectAlert = ({ children }: DeleteProjectAlertProps) => {
  const [inputValue, setInputValue] = useState('');
  const projectName = 'MyProject';

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>Delete Project</AlertDialogTitle>
        <AlertDialogDescription>
          Are you sure you want to delete this project? This action cannot be undone. To confirm,
          please type the project name {`"`}
          <span className="font-semibold">{projectName}</span>
          {`"`} below.
        </AlertDialogDescription>
        <Input
          className="mt-2"
          placeholder="Type project name here"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <AlertDialogFooter>
          <AlertDialogCancel className={cn(buttonVariants({ size: 'sm', variant: 'secondary' }))}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className={cn(buttonVariants({ size: 'sm', variant: 'destructive' }))}
            disabled={inputValue !== projectName}
          >
            Delete Project
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
