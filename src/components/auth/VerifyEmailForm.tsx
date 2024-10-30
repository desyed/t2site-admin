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
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Icon } from "@iconify/react";
import { Input } from "../ui/input";
import { useApi } from "@/hooks/use-api";
import { verifyEmailMutation } from "@/app/auth/authApi";
import { toast } from "sonner";
import { useAuthStore } from "@/app/auth/authStore";

const FormSchema = z.object({
	code: z
		.string()
		.min(1, {
			message: "Enter verification code",
		}),
});

export default function VerifyEmailForm() {
	const setAuth = useAuthStore((state) => state.setAuth);

	const { executeMutation: verifyEmail, loading } = useApi<any>(
		verifyEmailMutation,
		{
			toast: true,
		},
	);
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			code: "",
		},
		shouldFocusError: true,
	});

	async function onSubmit(values: z.infer<typeof FormSchema>) {
		const { data, success } = await verifyEmail(values);

		if (success) {
			console.log(data.user)
			if (data?.access_token && data.user.email && data.user.emailVerified) {
				setAuth(data.user, data.access_token);
				toast.success("Email Verified!", {
					description: "Your email has been successfully verified. 🎉",
					duration: 3000,
					position: "top-center"
				});
				form.reset();
			}
		}
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
									<Input placeholder="Enter the code" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className="mt-5 flex flex-col sm:mt-2">
					<Button type="submit" size="sm" disabled={loading}>
						{!loading && (
							<Icon
								className="w-8 h-8"
								icon="material-symbols:domain-verification"
							/>
						)}
						<LoadingSpinner visable={loading} /> Verify
					</Button>
				</div>
			</form>
		</Form>
	);
}
