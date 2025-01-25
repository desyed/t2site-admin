import { Icon } from "@iconify/react";
import { Link, useNavigate } from  "react-router";

import Brand from "@/components/Brand";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";

export default function NotFound() {
	const navigate = useNavigate();
	return (
		<div className="relative flex min-h-screen flex-col">
			<div className="flex h-[90px] items-center justify-between px-6 sm:px-10">
				<Link to="/">
					<Brand />
				</Link>
				<div>
					<ModeToggle />
				</div>
			</div>
			<div className="mt-16 flex flex-1 flex-col items-center gap-5 px-5 sm:mt-28 sm:p-8">
				<h1 className="text-4xl font-bold">404</h1>
				<p className="text-center text-lg text-muted-foreground">
					Sorry, the page you are looking for does not exist.
				</p>
				<Button onClick={() => navigate('/')} size="default">
					<Icon icon="line-md:arrow-left" className="size-8" />
					Go to home
				</Button>
			</div>
		</div>
	);
}
