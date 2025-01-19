
import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';

import { useNavigate } from 'react-router';

export default function NotFoundPrivate() {
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-screen flex-col">
      <div className="mt-16 flex flex-1 flex-col items-center gap-5 px-5 sm:mt-28 sm:p-8">
        <h1 className="text-4xl font-bold">404</h1>
        <p className="text-center text-lg text-muted-foreground">
          Sorry, the page you are looking for does not exist.
        </p>
        <Button onClick={() => navigate('/')} className="text-md" size="default">
          <Icon icon="line-md:arrow-left" className="w-8 h-8" />
          Go to dashboard
        </Button>
      </div>
    </div>
  );
}
