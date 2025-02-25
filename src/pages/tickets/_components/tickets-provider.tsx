import type React from 'react';

import { type ReactNode, createContext, useContext, useState } from 'react';

interface TicketsContextType {
  selectedTicketId: string | null;
  setSelectedTicketId: (id: string | null) => void;
}

const TicketsContext = createContext<TicketsContextType | undefined>(undefined);

export const useTickets = () => {
  const context = useContext(TicketsContext);
  if (context === undefined) {
    throw new Error('useTickets must be used within a TicketsProvider');
  }
  return context;
};

interface TicketsProviderProps {
  children: ReactNode;
}

export const TicketsProvider: React.FC<TicketsProviderProps> = ({
  children,
}) => {
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);

  return (
    <TicketsContext.Provider value={{ selectedTicketId, setSelectedTicketId }}>
      {children}
    </TicketsContext.Provider>
  );
};
