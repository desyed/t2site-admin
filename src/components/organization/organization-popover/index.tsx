import { useCallback, useState } from 'react';

import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover';
import CurrentOrganizationLabel from './current-organization-label';
import OrganizationPopoverContent from './organization-popover-content';

export default function OrganizationPopover() {
  const [open, setOpen] = useState(false);

  const closePopover = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const handleToggle = useCallback(() => {
    setOpen(!open);
  }, [open, setOpen]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <CurrentOrganizationLabel handleToggle={handleToggle} />
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="end">
        <OrganizationPopoverContent closePopover={closePopover} />
      </PopoverContent>
    </Popover>
  );
}
