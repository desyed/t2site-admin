import { InfoIcon, Loader2 } from 'lucide-react';
import { BanIcon } from 'lucide-react';
import { useRef, useState } from 'react';

import { AlertDialog } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';
export type SiteAlertDialogProps = {
  title: React.ReactNode;
  description: React.ReactNode;
  onConfirm: () => void;
  onCancel?: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  loading?: boolean;
  confirmText?: React.ReactNode;
  loadingText?: React.ReactNode;
  cancelText?: React.ReactNode;
  isDanger?: boolean;
  confirmInput?: boolean;
  confirmInputValue?: string;
  ref?: React.RefObject<HTMLDivElement>;
};

export default function SiteAlertDialog({
  title,
  description,
  open,
  setOpen,
  onConfirm,
  onCancel,
  loading,
  confirmText,
  cancelText,
  loadingText,
  isDanger,
  confirmInput,
  confirmInputValue,
  ref,
}: SiteAlertDialogProps) {
  const [inputValue, setInputValue] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const [promptConfirmError, setPromptConfirmError] = useState<string | null>(
    null
  );

  const handleConfirm = () => {
    if (confirmInput) {
      if (inputValue?.toLowerCase() === confirmInputValue?.toLowerCase()) {
        setPromptConfirmError(null);
        onConfirm();
      } else {
        inputRef.current?.focus();
        setPromptConfirmError(
          'Please confirm by typing the ' +
            (confirmInputValue ?? 'Yes') +
            ' to confirm'
        );
      }
    } else {
      onConfirm();
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent ref={ref}>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            {confirmInput && <InfoIcon className="size-4 shrink-0" />}
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="flex items-start gap-2">
            <span>{description}</span>
          </AlertDialogDescription>
          {confirmInput && (
            <div className="flex flex-col gap-1">
              <Label className="mb-1 text-sm">
                Type{' '}
                <span className="font-semibold text-primary">
                  {confirmInputValue ?? 'Yes'}
                </span>{' '}
                to confirm
              </Label>
              <Input
                ref={inputRef}
                value={inputValue ?? ''}
                className="h-8"
                placeholder={inputValue ?? 'Yes'}
                onChange={(e) => {
                  if (
                    e.target.value?.toLowerCase() ===
                    confirmInputValue?.toLowerCase()
                  ) {
                    setPromptConfirmError(null);
                  } else {
                    setPromptConfirmError(
                      'Please confirm by typing the ' +
                        (confirmInputValue ?? 'Yes') +
                        ' to confirm'
                    );
                  }
                  setInputValue(e.target.value);
                }}
              />
              <span className="text-sm text-red-500">{promptConfirmError}</span>
            </div>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant="outline" onClick={onCancel}>
              <BanIcon className="size-3 sm:size-4" /> {cancelText || 'Cancel'}
            </Button>
          </AlertDialogCancel>
          <Button
            variant={isDanger ? 'destructive' : 'default'}
            className={cn(
              isDanger &&
                'bg-destructive text-foreground hover:bg-destructive/90 focus-visible:ring-destructive'
            )}
            onClick={handleConfirm}
            disabled={loading}
            icon={
              loading ? <Loader2 className="size-4 animate-spin" /> : undefined
            }
          >
            {confirmText || 'Confirm'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
