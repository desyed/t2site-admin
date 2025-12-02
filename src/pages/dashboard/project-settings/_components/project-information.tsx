import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const ProjectInformation = () => (
  <div className="space-y-12">
    <Card className="border-none shadow-none">
      <CardContent className="space-y-4 p-0">
        <div className="grid gap-2">
          <Label>Project Name</Label>
          <Input placeholder="Your Project Name" />
        </div>

        <div className="grid gap-2">
          <Label>Website URL</Label>
          <Input placeholder="https://www.yourwebsite.com" />
        </div>

        <div className="grid gap-2">
          <Label>Description</Label>
          <Input placeholder="Project Description" />
        </div>

        <Button>Save</Button>
      </CardContent>
    </Card>
  </div>
);
