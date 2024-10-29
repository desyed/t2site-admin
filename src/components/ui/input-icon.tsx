import * as React from "react";
import { Input, InputProps } from "./input";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";

export type InputIconProps = {
  icon: string;
} & InputProps;

const InputIcon = React.forwardRef<HTMLInputElement, InputIconProps>(
  ({ className, icon, ...props }, ref) => {
    return (
      <div className="relative">
        <div
          className="bg-muted absolute left-0 top-0 h-full w-10 flex justify-center items-center rounded-md border border-input  rounded-r-none text-muted-foreground"
          aria-invalid={props["aria-invalid"]}
        >
          <Icon className="w-5 h-5" icon={icon} />
        </div>
        <Input className={cn("pl-12", className)} ref={ref} {...props} />
      </div>
    );
  },
);

InputIcon.displayName = "InputIcon";

export { InputIcon };
