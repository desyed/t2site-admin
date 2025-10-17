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

const ProfileCompletionFloatDialog = () => {
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
      <AlertDialogContent className="flex max-w-2xl items-center justify-between p-8">
        <AlertDialogHeader className="flex flex-row items-center gap-4">
          <div>
            <AlertCircleIcon className="size-8" />
          </div>
          <div>
            <AlertDialogTitle>Your profile is incomplete</AlertDialogTitle>
            <AlertDialogDescription>
              Please complete your profile to unlock all features.
            </AlertDialogDescription>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Link to={`/${projectId}/project-settings`}>
            <AlertDialogAction>Complete Profile</AlertDialogAction>
          </Link>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default ProfileCompletionFloatDialog;
