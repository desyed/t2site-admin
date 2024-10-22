import Brand from "@/components/Brand";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button"; // Import the shadcn button component
import { Link } from "react-router-dom";

export default function NotFound() {
	return (
		<div className="relative flex min-h-screen flex-col">
			<div className="flex h-[90px] items-center justify-between px-6 sm:px-10">
				<div>
					<Brand />
				</div>
				<div>
					<ModeToggle />
				</div>
			</div>
			<div className="mt-16 flex flex-1 flex-col items-center gap-5 px-5 sm:mt-28 sm:p-8">
				<h1 className="text-4xl font-bold">404</h1>
				<p className="text-center text-lg text-gray-500">
					Sorry, the page you are looking for does not exist.
				</p>
				<Link to="/">
					<Button className="">Go back</Button>
				</Link>
			</div>
		</div>
	);
}
