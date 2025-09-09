'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { z } from 'zod';

import type { TAuthUser } from '@/app/auth/auth.store';

import { singupApi } from '@/app/auth/auth.api';
import { useAuthStore } from '@/app/auth/auth.store';
import { Button } from '@/components/site-button';
import SitePassword from '@/components/site-password';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { InputIcon } from '@/components/ui/input-icon';
import { useApi } from '@/hooks/use-api';
import { handleServerErrors } from '@/lib/error';
import { passwordRegex } from '@/lib/utils';

import { Input } from '../ui/input';

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
      (value) => passwordRegex.test(value),
      'Password must be at least 8 characters and include uppercase, lowercase, number, and special character.'
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
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2"
      >
        <div>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs uppercase text-gray-500">
                  Name
                </FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
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
                <FormLabel className="text-xs uppercase text-gray-500">
                  Email
                </FormLabel>
                <FormControl>
                  <Input placeholder="example@example.com" {...field} />
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
                <FormLabel className="text-xs uppercase text-gray-500">
                  Password
                </FormLabel>
                <FormControl>
                  <SitePassword
                    value={field.value}
                    onChange={(value) => field.onChange(value)}
                    id={field.name}
                    error={!!form.formState.errors.password?.message}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="mt-5 flex flex-col sm:mt-4">
          <Button
            type="submit"
            size="sm"
            disabled={loading}
            loading={loading}
            effect="none"
          >
            Signup
          </Button>
        </div>
      </form>
    </Form>
  );
}
