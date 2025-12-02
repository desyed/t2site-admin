import { useChatWidgetStore } from '@/app/settings/chat-widget/chat-widget.store';
import { Button } from '@/components/site-button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { hexToHsl, normalizeHex } from '../helpers';

type Props = {
  handleSave: (
    hslBackground: string,
    hslForeground: string,
    hslBadge: string
  ) => void;
};

export const ColorsForm = ({ handleSave }: Props) => {
  const primaryBgColor = useChatWidgetStore((s) => s.background);
  const primaryFgColor = useChatWidgetStore((s) => s.foreground);
  const logoBadgeBgColor = useChatWidgetStore(
    (s) => s.logoBadgeBackgroundColor
  );

  const setPrimaryBgColor = useChatWidgetStore((s) => s.setBackground);
  const setPrimaryFgColor = useChatWidgetStore((s) => s.setForeground);
  const setLogoBadgeBgColor = useChatWidgetStore(
    (s) => s.setLogoBadgeBackgroundColor
  );

  const status = useChatWidgetStore((s) => s.status);

  const handleSaveClick = () => {
    const hslBg = hexToHsl(primaryBgColor);
    const hslFg = hexToHsl(primaryFgColor);
    const hslBadge = hexToHsl(logoBadgeBgColor);

    handleSave(hslBg, hslFg, hslBadge);
  };

  return (
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
              onChange={(e) =>
                setLogoBadgeBgColor(normalizeHex(e.target.value))
              }
            />
            <Input
              type="text"
              value={logoBadgeBgColor}
              onChange={(e) =>
                setLogoBadgeBgColor(normalizeHex(e.target.value))
              }
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSaveClick} disabled={status.saving}>
            {status.saving ? 'Saving…' : 'Save'}
          </Button>

          {status.error && (
            <p className="ml-3 text-sm text-red-500">{status.error}</p>
          )}
          {status.success && (
            <p className="ml-3 text-sm text-green-600">{status.success}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
