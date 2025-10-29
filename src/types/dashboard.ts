import type React from 'react';

export interface Project {
  id: string;
  name: string;
}

export interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  current?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

export interface NavigationGroup {
  name: string;
  items: NavigationItem[];
}

export interface UserProfile {
  isComplete: boolean;
  completionPercentage: number;
}
