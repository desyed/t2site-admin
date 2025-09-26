'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { z } from 'zod';

import { loginApi } from '@/app/auth/auth.api';
import { useAuthStore } from '@/app/auth/auth.store';
import Alert from '@/components/Alert';
import { Button } from '@/components/site-button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { handleServerErrors } from '@/lib/error';
import { handleApiErrorException } from '@/lib/utils';

import { Input } from '../ui/input';
import { InputPassword } from '../ui/input-password';

const emailSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: 'Email is required',
    })
    .email({ message: 'Enter a valid email address' }),
});

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
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPasswordField, setShowPasswordField] = useState(false);
  const [emailValidated, setEmailValidated] = useState(false);

  const setAuth = useAuthStore((state) => state.setAuth);

  const form = useForm<z.infer<typeof loginSchema>>({
    defaultValues: {
      email: '',
      password: '',
    },
    shouldFocusError: true,
    mode: 'onSubmit',
  });

  const handleEmailValidation = async () => {
    const emailValue = form.getValues('email');

    try {
      emailSchema.parse({ email: emailValue });

      setEmailValidated(true);
      setShowPasswordField(true);

      form.clearErrors('email');

      setTimeout(() => {
        const passwordField = document.querySelector(
          'input[name="password"]'
        ) as HTMLInputElement;
        passwordField?.focus();
      }, 300);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const emailError = error.errors.find((err) =>
          err.path.includes('email')
        );
        if (emailError) {
          form.setError('email', {
            type: 'manual',
            message: emailError.message,
          });
        }
      }
    }
  };

  // Reset form state if email is changed after validation
  const handleEmailChange = () => {
    if (emailValidated) {
      setEmailValidated(false);
      setShowPasswordField(false);
      form.setValue('password', '');
      form.clearErrors();
      setInvalidCred(null);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const values = form.getValues();

    if (!emailValidated) {
      handleEmailValidation();
      return;
    }

    try {
      loginSchema.parse(values);
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

    setLoading(true);

    toast.promise(loginApi(values), {
      loading: 'Logging in...',
      success: async (result) => {
        const redirectTo = window.localStorage.getItem('redirect_to') || '/';

        if (result.data?.access_token && result.data.user.email) {
          if (!result.data.user.emailVerified) {
            setAuth(result.data.user, result.data.access_token);
            navigate('/verify', { replace: true });
            toast.warning('Email Not Verified!', {
              description:
                'You have successfully logged in, but your email is not verified. Please verify your email to enjoy full features.',
            });
          } else {
            navigate('/auth?auth_login=success&rp=' + redirectTo, {
              replace: true,
            });
            window.localStorage.removeItem('redirect_to');
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
        const { errors, code } = handleApiErrorException(error);
        if (code === 'invalid-credentials') {
          setInvalidCred(
            "Oops! The email or password you entered doesn't match our records. Please double-check and try again. 🔑"
          );
        } else {
          setInvalidCred(null);
        }

        if (errors) {
          handleServerErrors(form, errors);
        }
        return 'Failed to login';
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={handleFormSubmit} className="flex flex-col">
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
                      handleEmailChange();
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Password field - only show when email is validated */}
        <div
          className={`transition-all duration-300 ease-in-out ${
            showPasswordField
              ? 'mb-2 max-h-32 translate-y-0 opacity-100'
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
                  <InputPassword placeholder="•••••••••••••••••••" {...field} />
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

        <div className="mt-2 flex flex-col">
          <Button type="submit" size="sm" disabled={loading} effect="none">
            {emailValidated ? 'Login' : 'Continue'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
