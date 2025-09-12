'use client';

import { AlertCircle, X } from 'lucide-react';
import { useState } from 'react';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

export function ProfileIncompleteAlert() {
  const [isVisible, setIsVisible] = useState(true);
  const isProfileIncomplete = true; // This would come from user state

  if (!isVisible || !isProfileIncomplete) return null;

  return (
    <Alert className="flex items-center gap-2 border-orange-200 bg-orange-50">
      <div className="flex flex-col justify-center">
        <AlertCircle className="size-4 text-orange-600" />
      </div>
      <AlertDescription className="flex w-full items-center justify-between">
        <span className="text-orange-800">
          Your profile is incomplete. Complete your profile to unlock all
          features.
        </span>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="border-orange-300 bg-transparent text-orange-700 hover:bg-orange-100"
          >
            Complete Profile
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsVisible(false)}
            className="size-6 p-0 text-orange-600 hover:bg-orange-100"
          >
            <X className="size-4" />
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
}
