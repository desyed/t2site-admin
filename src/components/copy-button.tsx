import { useEffect, useState } from "react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";

interface CopyButtonProps extends ButtonProps {
  text: string;
  title?: string;
  afterCopyTitle?: string;
  showToasterMessage?: string;
}

export default function CopyButton({
  text,
  title,
  className,
  afterCopyTitle,
  showToasterMessage,
  ...props
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    } catch (error) {
      console.error("Failed to copy text", error);
    }
  };

  useEffect(() => {
    if (copied && showToasterMessage) {
      toast.success(showToasterMessage)
    }
  }, [copied])

  return (
    <Button
      onClick={handleCopy}
      variant="outline"
      className={`flex items-center gap-2 ${className || ""}`}
      {...props}
    >
      {copied ? (
        <Check className="size-4 text-green-500" />
      ) : (
        <Copy className="size-4" />
      )}
      {title && <span className="truncate block ">{copied && afterCopyTitle ? "Copied!" : title}</span>}
    </Button>
  );
}
