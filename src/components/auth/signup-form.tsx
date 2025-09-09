'use client';

import { useState } from 'react';
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
import { useApi } from '@/hooks/use-api';
import { handleServerErrors } from '@/lib/error';
import { passwordRegex } from '@/lib/utils';

import { Input } from '../ui/input';

// Schema for initial validation (name + email)
const initialFieldsSchema = z.object({
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
});

// Full schema for final signup
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
  const [showPasswordField, setShowPasswordField] = useState(false);
  const [initialFieldsValidated, setInitialFieldsValidated] = useState(false);
  const setAuth = useAuthStore((state) => state.setAuth);
  const navigate = useNavigate();

  const { executeMutation, loading } = useApi<{
    user: TAuthUser;
    access_token: string;
  }>(singupApi, {
    toast: true,
  });

  const form = useForm<z.infer<typeof SignupSchema>>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
    shouldFocusError: true,
    mode: 'onSubmit',
  });

  const handleInitialFieldsValidation = async () => {
    const values = form.getValues();
    const initialValues = { name: values.name, email: values.email };

    try {
      initialFieldsSchema.parse(initialValues);

      setInitialFieldsValidated(true);
      setShowPasswordField(true);

      form.clearErrors(['name', 'email']);

      setTimeout(() => {
        const passwordField = document.querySelector(
          'input[name="password"]'
        ) as HTMLInputElement;
        passwordField?.focus();
      }, 300);
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          const fieldName = err.path[0] as 'name' | 'email';
          form.setError(fieldName, {
            type: 'manual',
            message: err.message,
          });
        });
      }
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const values = form.getValues();

    if (!initialFieldsValidated) {
      handleInitialFieldsValidation();
      return;
    }

    try {
      SignupSchema.parse(values);
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          const fieldName = err.path[0] as keyof typeof values;
          form.setError(fieldName, {
            type: 'manual',
            message: err.message,
          });
        });
      }
      return;
    }

    form.clearErrors();

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
      setInitialFieldsValidated(false);
      setShowPasswordField(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleFormSubmit} className="flex flex-col">
        <div className="mb-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs uppercase text-gray-500">
                  Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="John Doe"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="mb-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs uppercase text-gray-500">
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="example@example.com"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Password field - only show when initial fields are validated */}
        <div
          className={`transition-all duration-300 ease-in-out ${
            showPasswordField
              ? 'mb-2 max-h-40 translate-y-0 opacity-100'
              : 'max-h-0 -translate-y-2 overflow-hidden opacity-0'
          }`}
        >
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

        <div className="mt-2 flex flex-col">
          <Button
            type="submit"
            size="sm"
            disabled={loading}
            loading={loading}
            effect="none"
          >
            {initialFieldsValidated ? 'Sign Up' : 'Continue'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
