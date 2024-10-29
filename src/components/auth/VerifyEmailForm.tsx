"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Input } from "../ui/input";

const FormSchema = z.object({
  code: z
    .string()
    .min(1, {
      message: "Enter verification code",
    })
    .email({ message: "Enter a valid email address" }),
});

export default function LoginForm() {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      code: "",
    },
    shouldFocusError: true,
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);
    alert(data);
    setLoading(false);
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
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Enter the code"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="mt-5 flex flex-col sm:mt-2">
          <Button type="submit" size="sm" disabled={loading}>
            <LoadingSpinner visable={loading} /> Verify
          </Button>
        </div>
      </form>
    </Form>
  );
}
