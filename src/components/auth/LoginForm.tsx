'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { InputIcon } from '@/components/ui/input-icon';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { InputPassword } from '../ui/input-password';
import { toast } from 'sonner';
import { displayFieldsError } from '@/lib/error';
import { useAuthStore } from '@/app/auth/authStore';
import { getSessionQuery, loginMutation } from '@/app/auth/authApi';
import Alert from '@/components/Alert';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { handleApi, handleApiErrorException } from '@/lib/utils';
import { useNavigate } from "react-router-dom";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: 'Email is required',
    })
    .email({ message: 'Enter a valid email address' }),
  password: z.string().min(1, {
    message: 'Password is required',
  }),
});

export default function LoginForm() {
  const [invalidCred, setInvalidCred] = useState<string | null>(null);
	const navigation = useNavigate();
  const [loading, setLoading] = useState(false);

  const setAuth = useAuthStore((state) => state.setAuth);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    shouldFocusError: true,
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setLoading(true);
    setInvalidCred(null);

    toast.promise(loginMutation(values), {
      loading: 'Logging in...',
      success: async (result) => {
        if (result.data?.access_token && result.data.user.email) {
          if (!result.data.user.emailVerified) {
						setAuth(result.data.user, result.data.access_token);
            toast.warning('Email Not Verified!', {
              description:
                'You have successfully logged in, but your email is not verified. Please verify your email to enjoy full features.',
            });
          } else {
            const { data } = await handleApi(getSessionQuery);
            if (data?.email) {
							setAuth(result.data, result.data.access_token)
            } else {
							navigation('/auth?auth_login=success');
						}
          }
          form.reset();
        }
        return 'Login successful!';
      },
      finally: () => {
        setLoading(false);
      },
      position: 'top-center',
      duration: 1000,
      error: (error) => {
        const { errors } = handleApiErrorException(error);
        if (errors && errors?.invalidCred) {
          setInvalidCred(errors?.invalidCred);
        }
        if (errors && !errors?.invalidCred) {
          displayFieldsError(form, errors);
        }
        return 'Failed to login';
      },
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-3"
      >
        <div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <InputIcon
                    icon="mdi:email"
                    placeholder="example@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div>
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <InputPassword
                    icon="mdi:lock"
                    placeholder="•••••••••••••••••••"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {invalidCred && (
          <Alert
            close={true}
            handleClose={() => {
              setInvalidCred(null);
            }}
            title="Invalid credentials"
            message={invalidCred}
            type="error"
          />
        )}

        <div className="mt-5 flex flex-col sm:mt-2">
          <Button type="submit" size="sm" disabled={loading}>
            <LoadingSpinner visable={loading} /> Login
          </Button>
        </div>
      </form>
    </Form>
  );
}
