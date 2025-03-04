import { Switch } from '@/components/ui/switch';

export default function ServiceToggle({
  title,
  description,
  checked,
  onCheckedChange,
  features,
  icon,
}: {
  title: string;
  description: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  features: string[];
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between p-4">
      <div className="space-y-2">
        <div>
          <div className="flex items-center gap-2 font-medium">
            {icon}
            {title}
          </div>
          <div className="text-sm text-muted-foreground">{description}</div>
        </div>
        <ul className="space-y-1 text-xs text-muted-foreground">
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
