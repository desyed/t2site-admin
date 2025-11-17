import { Button } from '@/components/site-button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { normalizeHex } from '../helpers';

type Props = {
  primaryBgColor: string;
  primaryFgColor: string;
  logoBadgeBgColor: string;
  setPrimaryBgColor: (v: string) => void;
  setPrimaryFgColor: (v: string) => void;
  setLogoBadgeBgColor: (v: string) => void;
  handleSave: () => void;
  saving: boolean;
  error: string | null;
  success: string | null;
};

export const ColorsForm = ({
  primaryBgColor,
  primaryFgColor,
  logoBadgeBgColor,
  setPrimaryBgColor,
  setPrimaryFgColor,
  setLogoBadgeBgColor,
  handleSave,
  saving,
  error,
  success,
}: Props) => (
  <Card className="border-none shadow-none">
    <CardContent className="space-y-4 p-0">
      {/* Primary Background */}
      <div className="grid gap-2">
        <Label>Primary Background Color</Label>
        <div className="flex items-center gap-2">
          <Input
            type="color"
            value={primaryBgColor}
            className="w-12 p-1.5"
            onChange={(e) => setPrimaryBgColor(normalizeHex(e.target.value))}
          />
          <Input
            type="text"
            value={primaryBgColor}
            onChange={(e) => setPrimaryBgColor(normalizeHex(e.target.value))}
          />
        </div>
      </div>

      {/* Primary Foreground */}
      <div className="grid gap-2">
        <Label>Primary Foreground Color</Label>
        <div className="flex items-center gap-2">
          <Input
            type="color"
            value={primaryFgColor}
            className="w-12 p-1.5"
            onChange={(e) => setPrimaryFgColor(normalizeHex(e.target.value))}
          />
          <Input
            type="text"
            value={primaryFgColor}
            onChange={(e) => setPrimaryFgColor(normalizeHex(e.target.value))}
          />
        </div>
      </div>

      {/* Logo Badge */}
      <div className="grid gap-2">
        <Label>Logo Badge Background</Label>
        <div className="flex items-center gap-2">
          <Input
            type="color"
            value={logoBadgeBgColor}
            className="w-12 p-1.5"
            onChange={(e) => setLogoBadgeBgColor(normalizeHex(e.target.value))}
          />
          <Input
            type="text"
            value={logoBadgeBgColor}
            onChange={(e) => setLogoBadgeBgColor(normalizeHex(e.target.value))}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={saving}>
          {saving ? 'Saving…' : 'Save'}
        </Button>

        {error && <p className="ml-3 text-sm text-red-500">{error}</p>}
        {success && <p className="ml-3 text-sm text-green-600">{success}</p>}
      </div>
    </CardContent>
  </Card>
);
