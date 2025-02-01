import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import * as z from 'zod';

import { createOrganizationApi } from '@/app/organization/organization-api';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useApi } from '@/hooks/use-api';
import { handleServerErrors } from '@/lib/error';
import { logDev } from '@/lib/utils';

export const createOrganizationSchema = z.object({
  name: z.string().min(2, 'Organization name must be at least 2 characters'),
  description: z.string().optional(),
});

export type CreateOrganizationFormData = z.infer<
  typeof createOrganizationSchema
>;

export function CreateOrganizationForm({ onClose }: { onClose: () => void }) {
  const form = useForm<CreateOrganizationFormData>({
    resolver: zodResolver(createOrganizationSchema),
    defaultValues: {
      name: '',
    },
  });

  const navigate = useNavigate();

  const { loading, executeMutation } = useApi<{
    access_token: string;
    organizationId: string;
  }>(createOrganizationApi, {
    toast: true,
  });

  const handleSubmit = async (values: CreateOrganizationFormData) => {
    try {
      const result = await executeMutation(values);
      if (result.errors) {
        return handleServerErrors(form, result.errors);
      }
      if (result.data?.organizationId) {
        toast.success('Organization created successfully!', {
          description: 'You can now start building your organization.',
          position: 'top-center',
          duration: 3000,
        });
        navigate(`/auth?ocr=true&rp=${window.location.pathname}`);
        onClose();
      } else {
        toast.error('Failed to create organization!', {
          description: 'Please try again.',
          position: 'top-center',
          duration: 3000,
        });
      }
    } catch (error) {
      logDev(error);
    } finally {
      form.reset();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organization Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter organization name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="pt-2">
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Creating...
              </>
            ) : (
              'Create Organization'
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
