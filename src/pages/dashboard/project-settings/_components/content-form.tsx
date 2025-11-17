import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const ContentForm = () => (
  <Card className="border-none shadow-none">
    <CardContent className="space-y-4 p-0">
      <div className="grid gap-2">
        <Label>Welcome Text</Label>
        <Input id="welcome" />
      </div>

      <div className="grid gap-2">
        <Label>CTA Text</Label>
        <Input id="cta" />
      </div>

      <div className="grid gap-2">
        <Label>Promotional Image Link</Label>
        <Input id="promo-link" />
      </div>
    </CardContent>
  </Card>
);
