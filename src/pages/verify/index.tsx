import { useState } from 'react';
import { toast } from 'sonner';

import { sendEmailVerificationApi } from '@/app/auth/auth.api';
import VerifyEmailForm from '@/components/auth/verify-email-form';
import { useAuth } from '@/contexts/auth-provider';
import { handleApiErrorException } from '@/lib/utils';

export function Component() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSendVerificationCode = () => {
    setLoading(true);
    toast.promise(sendEmailVerificationApi(), {
      position: 'top-center',
      duration: 1000,
      loading: 'Sending verification code...',
      success: () => {
        return 'A new verification code has been sent!';
      },
      error: (err) => {
        handleApiErrorException(err, true);
        return 'Oops! Failed to send the verification code. ';
      },
      finally: () => {
        setLoading(false);
      },
    });
  };
  return (
    <>
      <div className="mb-5">
        <h3 className="text-center text-xl font-semibold">Verify Your Email</h3>
        <p className="mt-2 text-foreground/80">
          Please check your inbox and click the verification link sent to{' '}
          <strong className="font-semibold hover:underline">
            {user?.email}
          </strong>
          .
        </p>
        <p className="mt-3 text-muted-foreground">
          {`Didn't`} receive the email? Check your spam, or
          <button
            disabled={loading}
            onClick={handleSendVerificationCode}
            className="font-bold hover:underline disabled:opacity-80 dark:text-primary"
          >
            Click here to resend it
          </button>
          .
        </p>
      </div>
      <VerifyEmailForm />
    </>
  );
}
