import type { LucideIcon } from 'lucide-react';

import { Switch } from '@/components/ui/switch';
export default function ServiceToggle({
  title,
  description,
  checked,
  onCheckedChange,
  features,
  Icon,
}: {
  title: string;
  description: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  features: string[];
  Icon: LucideIcon;
}) {
  return (
    <div className="flex items-start justify-between p-3">
      <div className="space-y-3">
        <div>
          <div className="flex items-center gap-2 text-base font-medium">
            <Icon className="size-4" />
            {title}
          </div>
          <div className="mt-1 text-sm text-muted-foreground">
            {description}
          </div>
        </div>
        <ul className="mt- space-y-1 text-xs text-muted-foreground">
          {features.map((feature) => (
            <li key={feature} className="flex items-center gap-1">
              <span className="size-1 rounded-full bg-primary/30" />
              {feature}
            </li>
          ))}
        </ul>
      </div>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );
}
