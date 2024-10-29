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
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { InputIcon } from "@/components/ui/input-icon";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useState } from "react";
import { InputPassword } from "../ui/input-password";

const FormSchema = z.object({
	email: z
		.string()
		.min(1, {
			message: "Email is required",
		})
		.email({ message: "Enter a valid email address" }),
	password: z.string().min(1, {
		message: "Password is required",
	}),
});

export default function LoginForm() {
	const [loading, setLoading] = useState(false);

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			email: "",
			password: "",
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
						<LoadingSpinner visable={loading} /> Login
					</Button>
				</div>
			</form>
		</Form>
	);
}
