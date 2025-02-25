'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Icon } from '@iconify/react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { z } from 'zod';

import type { TAuthUser } from '@/app/auth/auth-store';

import { verifyEmailApi } from '@/app/auth/auth-api';
import { useAuthStore } from '@/app/auth/auth-store';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { useApi } from '@/hooks/use-api';
import { handleServerErrors } from '@/lib/error';

import { Input } from '../ui/input';

const FormSchema = z.object({
  code: z.string().min(1, {
    message: 'Enter verification code',
  }),
});

export default function VerifyEmailForm() {
  const setAuth = useAuthStore((state) => state.setAuth);
  const navigate = useNavigate();
  const { executeMutation: verifyEmail, loading } = useApi<{
    user: TAuthUser;
    access_token: string;
  }>(verifyEmailApi, {
    toast: true,
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      code: '',
    },
    shouldFocusError: true,
  });

  async function onSubmit(values: z.infer<typeof FormSchema>) {
    const { data, success, errors } = await verifyEmail(values);

    if (errors) {
      return handleServerErrors(form, errors);
    }

    if (success) {
      if (data?.access_token && data.user.email && data.user.emailVerified) {
        setAuth(data.user, data.access_token);
        navigate(
          '/auth?auth_login=success&rp=' + window.localStorage.getItem('redirect_to') || '/',
          { replace: true }
        );
        toast.success('Email Verified!', {
          description: 'Your email has been successfully verified. 🎉',
          duration: 3000,
          position: 'top-center',
        });
        form.reset();
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <div>
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Enter the code" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="mt-5 flex flex-col sm:mt-2">
          <Button type="submit" size="sm" disabled={loading}>
            {!loading && <Icon className="size-8" icon="material-symbols:domain-verification" />}
            <LoadingSpinner visable={loading} /> Verify
          </Button>
        </div>
      </form>
    </Form>
  );
}
