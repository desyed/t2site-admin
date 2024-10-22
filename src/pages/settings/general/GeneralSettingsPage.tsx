import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { delay } from "@/lib/utils";
import { useState } from "react";

export async function loader() {
	await delay(1000);
	return {
		title: "General Settings",
	};
}

export function Component() {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
	};

	return (
		<div className="container mx-auto p-6">
			<h1 className="text-2xl font-bold mb-6">General Settings</h1>
			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<Label htmlFor="username">Username</Label>
					<Input
						id="username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						placeholder="Enter your username"
					/>
				</div>
				<div>
					<Label htmlFor="email">Email</Label>
					<Input
						id="email"
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Enter your email"
					/>
				</div>
				<Button type="submit">Save Changes</Button>
			</form>
		</div>
	);
}
