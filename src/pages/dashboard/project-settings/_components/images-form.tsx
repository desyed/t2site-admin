import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const ImagesForm = () => (
  <Card className="border-none shadow-none">
    <CardContent className="space-y-4 p-0">
      <div className="grid gap-2">
        <Label>Logo Image</Label>
        <Input id="logo" type="file" />
      </div>

      <div className="grid gap-2">
        <Label>Banner Image</Label>
        <Input id="banner" type="file" />
      </div>

      <div className="grid gap-2">
        <Label>Promotional Image</Label>
        <Input id="promo" type="file" />
      </div>
    </CardContent>
  </Card>
);
