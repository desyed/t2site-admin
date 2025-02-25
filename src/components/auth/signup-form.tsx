'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { z } from 'zod';

import type { TAuthUser } from '@/app/auth/auth-store';

import { singupApi } from '@/app/auth/auth-api';
import { useAuthStore } from '@/app/auth/auth-store';
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
import { useApi } from '@/hooks/use-api';
import { handleServerErrors } from '@/lib/error';
import { isValidPassword } from '@/lib/utils';

import { InputPassword } from '../ui/input-password';

const SignupSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Name is required' })
    .min(2, { message: 'Name must be at least 2 characters long' })
    .max(70, { message: 'Name cannot exceed 70 characters' })
    .regex(/^[A-Za-z]+([ '-][A-Za-z]+)*$/, {
      message:
        'Name can only contain letters, spaces, hyphens, or apostrophes and must not start or end with special characters.',
    })
    .trim(),
  email: z
    .string()
    .min(1, {
      message: 'Email is required',
    })
    .max(250, { message: 'Email cannot exceed 250 characters' })
    .email({ message: 'Enter a valid email address' })
    .trim(),
  password: z
    .string()
    .min(1, {
      message: 'Password is required',
    })
    .max(30, {
      message: 'Password cannot exceed 30 characters',
    })
    .refine(
      isValidPassword,
      'Password must be at least 8 characters and include upper, lower, number, and special.'
    ),
});

export default function SingupForm() {
  const setAuth = useAuthStore((state) => state.setAuth);

  const { executeMutation, loading } = useApi<{
    user: TAuthUser;
    access_token: string;
  }>(singupApi, {
    toast: true,
  });

  const form = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
    shouldFocusError: true,
  });
  const navigate = useNavigate();

  async function onSubmit(values: z.infer<typeof SignupSchema>) {
    const result = await executeMutation(values);

    if (result.errors) {
      return handleServerErrors(form, result.errors);
    }
    if (result.success) {
      toast.success('Congratulations! 🎉', {
        description:
          'You have successfully signed up! \n\nTo get started, please verify your email address.',
        position: 'top-center',
        duration: 1000,
        style: {
          fontSize: '0.95rem',
        },
      });
      if (result.data?.access_token && result.data.user.email) {
        setAuth(result.data.user, result.data.access_token);
      }
      navigate('/verify', { replace: true });
      form.reset();
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <div>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <InputIcon icon="mdi:rename" placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <InputIcon icon="mdi:email" placeholder="example@example.com" {...field} />
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
                  <InputPassword icon="mdi:lock" placeholder="•••••••••••••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="mt-5 flex flex-col sm:mt-2">
          <Button type="submit" size="sm" disabled={loading}>
            <LoadingSpinner visable={loading} /> Signup
          </Button>
        </div>
      </form>
    </Form>
  );
}
