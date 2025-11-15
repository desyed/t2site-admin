import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Trash2 } from 'lucide-react';
import { useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

// Validation schema using Zod
const faqSchema = z.object({
  faqs: z
    .array(
      z.object({
        question: z.string().min(1, 'Question is required'),
        answer: z.string().min(1, 'Answer is required'),
      })
    )
    .min(1, 'At least one FAQ is required'),
});

type FaqFormValues = z.infer<typeof faqSchema>;

export const FaqForm = () => {
  const form = useForm<FaqFormValues>({
    resolver: zodResolver(faqSchema),
    defaultValues: {
      faqs: [{ question: '', answer: '' }],
    },
  });

  const { control, handleSubmit, trigger } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'faqs',
  });

  // Handle Add More with validation check
  const handleAddMore = async () => {
    const isValid = await trigger('faqs');
    if (!isValid) {
      toast.warning('Validation Error', {
        description: 'Please fill in all required fields before adding more.',
        duration: 3000,
      });
      return;
    }
    append({ question: '', answer: '' });
  };

  const onSubmit = (data: FaqFormValues) => {
    // eslint-disable-next-line no-console
    console.log('Submitted Data:', data);
    toast.success('Form submitted successfully!');
  };

  return (
    <div className="space-y-4">
      <h3 className="text-[12px] uppercase text-gray-500">FAQ Questions</h3>
      <Card className="border-none shadow-none">
        <CardContent className="p-0">
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="relative space-y-4 rounded-lg bg-muted/30 p-4"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold">FAQ #{index + 1}</h3>
                    {fields.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => remove(index)}
                      >
                        <Trash2 className="size-4 text-red-500" />
                      </Button>
                    )}
                  </div>

                  {/* Question Field */}
                  <FormField
                    control={control}
                    name={`faqs.${index}.question`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Question</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter the question..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Answer Field */}
                  <FormField
                    control={control}
                    name={`faqs.${index}.answer`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Answer</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter the answer..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}

              <div className="flex items-center justify-between pt-4">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleAddMore}
                >
                  <Plus /> Add More
                </Button>

                <Button type="submit" className="bg-primary text-white">
                  Save FAQs
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
