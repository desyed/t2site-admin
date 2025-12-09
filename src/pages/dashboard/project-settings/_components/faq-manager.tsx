'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { useCurrentProjectQuery } from '@/app/project/project.hooks';
import {
  useCreateFaq,
  useDeleteFaq,
  useFaqsQuery,
  useUpdateFaq,
} from '@/app/settings/faq/faq.hooks';
import { useFaqStore } from '@/app/settings/faq/faq.store';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

// Zod Schema
const faqSchema = z.object({
  question: z.string().min(1, 'Question is required'),
  answer: z.string().min(1, 'Answer is required'),
});

export default function FaqManager() {
  const { data: currentProject } = useCurrentProjectQuery();
  const liveDeskId = currentProject?.features?.liveDesk.id ?? '';

  // Zustand Store - real source of truth
  const faqs = useFaqStore((s) => s.faqs);

  // Dialog States
  const [editingFaq, setEditingFaq] = useState<any | null>(null);
  const [deletingFaq, setDeletingFaq] = useState<any | null>(null);

  // Queries
  const { isLoading } = useFaqsQuery(liveDeskId);

  // Mutations
  const createFaq = useCreateFaq(liveDeskId);
  const updateFaq = useUpdateFaq(liveDeskId);
  const deleteFaq = useDeleteFaq(liveDeskId);

  // Forms
  const createForm = useForm({
    resolver: zodResolver(faqSchema),
    defaultValues: { question: '', answer: '' },
  });

  const editForm = useForm({
    resolver: zodResolver(faqSchema),
    defaultValues: { question: '', answer: '' },
  });

  // Create FAQ
  const handleCreate = (values: any) => {
    createFaq.mutate(values, {
      onSuccess: () => {
        toast.success('FAQ Created!');
        createForm.reset();
      },
      onError: () => toast.error('Failed to create FAQ'),
    });
  };

  // Open Edit Modal
  const openEdit = (faq: any) => {
    setEditingFaq(faq);
    editForm.reset({
      question: faq.question,
      answer: faq.answer,
    });
  };

  // Update FAQ
  const handleEdit = (values: any) => {
    if (!editingFaq) return;

    updateFaq.mutate(
      {
        id: editingFaq.id,
        body: values,
      },
      {
        onSuccess: () => {
          toast.success('FAQ Updated!');
          setEditingFaq(null);
        },
        onError: () => toast.error('Failed to update FAQ'),
      }
    );
  };

  // Delete FAQ
  const confirmDelete = () => {
    if (!deletingFaq) return;

    deleteFaq.mutate(deletingFaq.id, {
      onSuccess: () => {
        toast.success('FAQ Deleted!');
        setDeletingFaq(null);
      },
      onError: () => toast.error('Failed to delete FAQ'),
    });
  };

  return (
    <div className="space-y-6">
      {/* ------------------ LOADING STATE ------------------ */}
      {isLoading && <p className="text-sm text-gray-500">Loading FAQs...</p>}

      {/* ------------------ FAQ LIST ------------------ */}
      {!isLoading && faqs.length === 0 ? (
        <p className="text-sm text-gray-600">No FAQs found.</p>
      ) : (
        <Accordion type="single" collapsible className="w-full space-y-2">
          {faqs.map((faq) => (
            <AccordionItem
              key={faq.id}
              value={faq.id}
              className="rounded-lg border px-3"
            >
              <div className="flex items-center justify-between">
                <AccordionTrigger className="text-left text-sm font-medium">
                  {faq.question}
                </AccordionTrigger>

                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => openEdit(faq)}
                  >
                    <Pencil className="size-4" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setDeletingFaq(faq)}
                  >
                    <Trash2 className="size-4 text-red-500" />
                  </Button>
                </div>
              </div>

              <AccordionContent className="pb-4 text-sm text-gray-700">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}

      {/* ------------------ CREATE FAQ ------------------ */}
      <div className="border-t pt-6">
        <h3 className="mb-3 text-xs uppercase text-gray-500">Add New FAQ</h3>

        <form
          onSubmit={createForm.handleSubmit(handleCreate)}
          className="space-y-4"
        >
          <Input placeholder="Question" {...createForm.register('question')} />
          <Textarea placeholder="Answer" {...createForm.register('answer')} />

          <Button
            type="submit"
            className="bg-primary text-white"
            disabled={createFaq.isPending}
          >
            {createFaq.isPending ? 'Creating...' : 'Create FAQ'}
          </Button>
        </form>
      </div>

      {/* ------------------ EDIT MODAL ------------------ */}
      <Dialog open={!!editingFaq} onOpenChange={() => setEditingFaq(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit FAQ</DialogTitle>
          </DialogHeader>

          <form
            onSubmit={editForm.handleSubmit(handleEdit)}
            className="space-y-4"
          >
            <Input placeholder="Question" {...editForm.register('question')} />
            <Textarea placeholder="Answer" {...editForm.register('answer')} />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setEditingFaq(null)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={updateFaq.isPending}>
                {updateFaq.isPending ? 'Saving...' : 'Save Changes'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* ------------------ DELETE MODAL ------------------ */}
      <Dialog open={!!deletingFaq} onOpenChange={() => setDeletingFaq(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete FAQ?</DialogTitle>
          </DialogHeader>

          <p className="text-sm text-gray-600">
            Are you sure you want to delete this FAQ? This action cannot be
            undone.
          </p>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDeletingFaq(null)}>
              Cancel
            </Button>
            <Button
              className="bg-red-600 text-white"
              onClick={confirmDelete}
              disabled={deleteFaq.isPending}
            >
              {deleteFaq.isPending ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
