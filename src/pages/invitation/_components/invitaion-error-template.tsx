import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { ArrowLeftIcon, XCircleIcon, CircleAlertIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function InvitationErrorTemplate({ message, title, type = 'error' }: { message: string, title: string, type: 'warning' | 'error' }) {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center justify-center">
        <div className={cn(
          "w-12 h-12 rounded-full flex items-center justify-center mb-2",
          type === 'warning' ? 'bg-primary/20' : 'bg-destructive/20'
        )}>
          {type === 'warning' ? <CircleAlertIcon className="w-6 h-6 text-primary" /> : <XCircleIcon className="w-6 h-6 text-destructive" />}
        </div>
        <h1 className={cn(
          "text-xl font-semibold",
          type === 'warning' ? 'text-primary' : 'text-destructive'
        )}>{title}</h1>
        <p className="text-center text-muted-foreground text-sm mt-2">{message}</p>
      </div>
      <div className="mt-6">
        <Link to="/">
          <Button variant="ghost" size="sm">
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  )
}
