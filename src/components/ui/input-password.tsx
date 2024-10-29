import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";
import * as React from "react";
import { useState } from "react";
import { Input, type InputProps } from "./input";
import { InputIcon } from "./input-icon";

export type InputPasswordProps = {
	icon?: string;
} & InputProps;

const InputPassword = React.forwardRef<HTMLInputElement, InputPasswordProps>(
	({ className, icon, ...props }, ref) => {
		const [showPassword, setShowPassword] = useState(false);
		const type = !showPassword ? "password" : "text";
		return (
			<div className="relative">
				{icon ? (
					<InputIcon
						ref={ref}
						className={cn("pr-9", className)}
						{...props}
						type={type}
						icon={icon}
					/>
				) : (
					<Input
						ref={ref}
						className={cn("pr-9", className)}
						{...props}
						type={type}
					/>
				)}

				<div
					className="absolute right-0 top-0 h-full w-10 flex justify-center items-center rounded-md rounded-l-none"
					aria-invalid={props["aria-invalid"]}
				>
					<button
						className="rounded-l-none active:scale-90 w-full h-full flex items-center justify-center text-muted-foreground hover:text-foreground mr-1"
						type="button"
						onClick={() => {
							setShowPassword(!showPassword);
						}}
					>
						{!showPassword ? (
							<Icon
								className={cn("w-5 h-5", className)}
								icon="mdi:eye-outline"
							/>
						) : (
							<Icon
								className={cn("w-5 h-5", className)}
								icon="mdi:eye-off-outline"
							/>
						)}
					</button>
				</div>
			</div>
		);
	},
);

InputPassword.displayName = "InputPassword";

export { InputPassword };
