import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const CookieConsentSettings = () => (
  <div className="space-y-12">
    <Card className="border-none shadow-none">
      <CardContent className="space-y-4 p-0">
        <div className="grid gap-2">
          <Label>Cookie Banner Message</Label>
          <Input placeholder="Your Cookie Banner Message" />
        </div>

        <div className="grid gap-2">
          <Label>Cookie Policy URL</Label>
          <Input placeholder="https://www.yourwebsite.com/cookie-policy" />
        </div>

        <Button>Save</Button>
      </CardContent>
    </Card>
  </div>
);
