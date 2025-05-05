import { memo } from 'react';

import { formatSmartTimestamp } from '@/lib/time';

export const DisplayTime = memo(({ timestamp }: { timestamp: string }) => {
  return (
    <div className="mb-3 mt-2 flex items-center justify-center">
      <div className="text-xs text-muted-foreground opacity-80">
        {formatSmartTimestamp(timestamp)}
      </div>
    </div>
  );
});

DisplayTime.displayName = 'DisplayTime';
