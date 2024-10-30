"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { singupMutation } from "@/app/auth/authApi";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { InputIcon } from "@/components/ui/input-icon";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useApi } from "@/hooks/use-api";
import { displayFieldsError } from "@/lib/error";
import { isValidPassword } from "@/lib/utils";
import { toast } from "sonner";
import { InputPassword } from "../ui/input-password";
import { TAuthUser, useAuthStore } from "@/app/auth/authStore";

const FormSchema = z.object({
	name: z
		.string()
		.min(1, { message: "Name is required" })
		.min(2, { message: "Name must be at least 2 characters long" })
		.max(70, { message: "Name cannot exceed 70 characters" })
		.regex(/^[A-Za-z0-9_-\s]+$/, {
			message: "Only letters, numbers, _, -, and spaces allowed",
		})
		.trim(),
	email: z
		.string()
		.min(1, {
			message: "Email is required",
		})
		.max(250, { message: "Email cannot exceed 250 characters" })
		.email({ message: "Enter a valid email address" })
		.trim(),
	password: z
		.string()
		.min(1, {
			message: "Password is required",
		})
		.max(30, {
			message: "Password cannot exceed 30 characters",
		})
		.refine(
			isValidPassword,
			"Password must be at least 8 characters and include upper, lower, number, and special.",
		),
});

export default function SingupForm() {
	const setAuth = useAuthStore((state) => state.setAuth);

	const { executeMutation, loading } = useApi<{
		user: TAuthUser;
		access_token: string;
	}>(singupMutation, {
		toast: true,
	});

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
		shouldFocusError: true,
	});

	async function onSubmit(values: z.infer<typeof FormSchema>) {
		const result = await executeMutation(values);
		if (result.errors) {
			return displayFieldsError(form, result.errors);
		}
		if (result.success) {
			toast.success("Congratulations! 🎉", {
				description:
					"You have successfully signed up! \n\nTo get started, please verify your email address.",
				position: "top-center",
				duration: 1000,
				style: {
					fontSize: "0.95rem",
				},
			});
			if (result.data?.access_token && result.data.user.email) {
				setAuth(result.data.user, result.data.access_token);
			}
			form.reset();
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
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<InputIcon
										icon="mdi:rename"
										placeholder="John Doe"
										{...field}
									/>
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
									<InputIcon
										icon="mdi:email"
										placeholder="example@example.com"
										{...field}
									/>
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
									<InputPassword
										icon="mdi:lock"
										placeholder="•••••••••••••••••••"
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
						<LoadingSpinner visable={loading} /> Signup
					</Button>
				</div>
			</form>
		</Form>
	);
}
