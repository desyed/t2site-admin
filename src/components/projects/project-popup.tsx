import { useCallback, useState } from 'react';

import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import CurrentProjectLabel from './current-project-label';
import ProjectPopupContent from './project-popup-content';

export default function ProjectPopup() {
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
        <CurrentProjectLabel handleToggle={handleToggle} />
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="end">
        <ProjectPopupContent closePopover={closePopover} />
      </PopoverContent>
    </Popover>
  );
}
