'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

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

// Zod Schemas
const faqSchema = z.object({
  question: z.string().min(1, 'Question is required'),
  answer: z.string().min(1, 'Answer is required'),
});

type Faq = {
  id: string;
  question: string;
  answer: string;
};

// Props: faqs from backend
const FaqManager = ({ initialFaqs }: { initialFaqs: Faq[] }) => {
  const [faqs, setFaqs] = useState<Faq[]>(initialFaqs);

  const [editingFaq, setEditingFaq] = useState<Faq | null>(null);
  const [deletingFaq, setDeletingFaq] = useState<Faq | null>(null);

  // Create form
  const createForm = useForm({
    resolver: zodResolver(faqSchema),
    defaultValues: { question: '', answer: '' },
  });

  // Edit form
  const editForm = useForm({
    resolver: zodResolver(faqSchema),
    defaultValues: { question: '', answer: '' },
  });

  // CREATE FAQ
  const handleCreate = async (values: any) => {
    // API CALL
    const newFaq: Faq = {
      id: crypto.randomUUID(),
      question: values.question,
      answer: values.answer,
    };

    setFaqs((prev) => [...prev, newFaq]);
    toast.success('FAQ Created!');
    createForm.reset();
  };

  // OPEN EDIT MODAL
  const openEdit = (faq: Faq) => {
    setEditingFaq(faq);
    editForm.reset({
      question: faq.question,
      answer: faq.answer,
    });
  };

  // SAVE EDIT
  const handleEdit = async (values: any) => {
    if (!editingFaq) return;

    // API CALL
    const updated = {
      ...editingFaq,
      question: values.question,
      answer: values.answer,
    };

    setFaqs((prev) => prev.map((f) => (f.id === updated.id ? updated : f)));

    toast.success('FAQ Updated!');
    setEditingFaq(null);
  };

  // DELETE FAQ
  const confirmDelete = async () => {
    if (!deletingFaq) return;

    // API CALL
    setFaqs((prev) => prev.filter((f) => f.id !== deletingFaq.id));
    toast.success('FAQ Deleted!');

    setDeletingFaq(null);
  };

  return (
    <div className="space-y-6">
      {/* ---------------------- FAQ LIST (ACCORDION) ---------------------- */}

      {faqs.length === 0 ? (
        <p className="text-sm text-gray-600">No FAQs added yet.</p>
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

      {/* ---------------------- ADD NEW FAQ FORM ---------------------- */}
      <div className="border-t pt-6">
        <h3 className="mb-3 text-xs uppercase text-gray-500">Add New FAQ</h3>

        <form
          onSubmit={createForm.handleSubmit(handleCreate)}
          className="space-y-4"
        >
          <Input placeholder="Question" {...createForm.register('question')} />
          <Textarea placeholder="Answer" {...createForm.register('answer')} />

          <Button type="submit" className="bg-primary text-white">
            Create FAQ
          </Button>
        </form>
      </div>

      {/* ---------------------- EDIT FAQ MODAL ---------------------- */}
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
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* ---------------------- DELETE CONFIRMATION ---------------------- */}
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
            <Button className="bg-red-600 text-white" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FaqManager;
