'use client';

import { useState } from 'react';
import { Link, useParams } from 'react-router';

import { Button } from '@/components/ui/button';

export function ProfileCompletionFloatButton() {
  const [isVisible] = useState(false);

  const { projectId } = useParams();

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-10">
      <Button
        className="rounded-full bg-black p-6 text-white shadow-lg hover:bg-gray-800"
        onClick={() => {
          // Handle profile completion redirect
          // eslint-disable-next-line no-console
          console.log('Redirecting to profile completion...');
        }}
      >
        <Link to={`/${projectId}/project-settings`} className="text-xs">
          <div className="font-medium">Getting Started</div>
          <div className="text-xs opacity-70">33% complete</div>
        </Link>
      </Button>
    </div>
  );
}
