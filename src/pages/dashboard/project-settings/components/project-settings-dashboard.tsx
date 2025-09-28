'use client';

import { useState } from 'react';

const sidebarItems = [
  { id: 'general', label: 'General' },
  { id: 'team', label: 'Team' },
  { id: 'integrations', label: 'Integrations' },
  { id: 'security', label: 'Security' },
];

export default function SimpleLayout() {
  const [active, setActive] = useState('general');

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-gray-50 p-4">
        <nav className="space-y-2">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className={`block w-full rounded px-3 py-2 text-left text-sm font-medium ${
                active === item.id
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-700 hover:bg-gray-200'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Content area */}
      <main className="flex-1 overflow-y-auto p-6">
        <div>Selected: {active}</div>
      </main>
    </div>
  );
}
