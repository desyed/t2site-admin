import { AlertCircleIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';

import { AlertDialogHeader, AlertDialogFooter } from '../ui/alert-dialog';

const ProjectCompletionFloatDialog = () => {
  const [open, setOpen] = useState(false);

  const { projectId } = useParams();

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="flex max-w-2xl flex-col items-center justify-center gap-8 p-8 sm:flex-row sm:justify-between">
        <AlertDialogHeader className="flex flex-col items-center gap-4 sm:flex-row">
          <div>
            <AlertCircleIcon className="size-8" />
          </div>
          <div>
            <AlertDialogTitle>Almost there!</AlertDialogTitle>
            <AlertDialogDescription>
              Complete chat integration to start chatting live with your
              visitors.
            </AlertDialogDescription>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Link to={`/${projectId}/project-settings`}>
            <AlertDialogAction>Continue</AlertDialogAction>
          </Link>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default ProjectCompletionFloatDialog;
