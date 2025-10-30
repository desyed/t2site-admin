'use client';

import { MessageCircle } from 'lucide-react';

import { PageHeader } from '@/components/dashboard/page-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const customersData = [
  {
    id: 'cust_001',
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '+1 (555) 123-4567',
    lastMessage: '2024-10-30 14:32:15',
    status: 'active',
    totalMessages: 24,
    responseRate: '95%',
  },
  {
    id: 'cust_002',
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    phone: '+1 (555) 234-5678',
    lastMessage: '2024-10-30 14:28:42',
    status: 'active',
    totalMessages: 18,
    responseRate: '88%',
  },
  {
    id: 'cust_003',
    name: 'Mike Chen',
    email: 'mike.chen@example.com',
    phone: '+1 (555) 345-6789',
    lastMessage: '2024-10-30 14:15:08',
    status: 'inactive',
    totalMessages: 12,
    responseRate: '75%',
  },
  {
    id: 'cust_004',
    name: 'Emma Wilson',
    email: 'emma.wilson@example.com',
    phone: '+1 (555) 456-7890',
    lastMessage: '2024-10-30 13:52:33',
    status: 'active',
    totalMessages: 31,
    responseRate: '100%',
  },
  {
    id: 'cust_005',
    name: 'David Brown',
    email: 'david.b@example.com',
    phone: '+1 (555) 567-8901',
    lastMessage: '2024-10-30 13:45:20',
    status: 'active',
    totalMessages: 42,
    responseRate: '92%',
  },
  {
    id: 'cust_006',
    name: 'Lisa Anderson',
    email: 'lisa.anderson@example.com',
    phone: '+1 (555) 678-9012',
    lastMessage: '2024-10-30 13:22:15',
    status: 'active',
    totalMessages: 8,
    responseRate: '80%',
  },
  {
    id: 'cust_007',
    name: 'Robert Taylor',
    email: 'robert.taylor@example.com',
    phone: '+1 (555) 789-0123',
    lastMessage: '2024-10-30 13:10:45',
    status: 'inactive',
    totalMessages: 5,
    responseRate: '60%',
  },
  {
    id: 'cust_008',
    name: 'Jessica Lee',
    email: 'jessica.lee@example.com',
    phone: '+1 (555) 890-1234',
    lastMessage: '2024-10-30 12:58:30',
    status: 'active',
    totalMessages: 19,
    responseRate: '89%',
  },
];

const getStatusColor = (status: string) => {
  return status === 'active'
    ? 'bg-green-100 text-green-800'
    : 'bg-gray-100 text-gray-800';
};

const getChannelIcon = (channel: string) => {
  switch (channel) {
    case 'WhatsApp':
      return '🟢';
    case 'Facebook':
      return '🔵';
    case 'Instagram':
      return '💗';
    case 'Email':
      return '✉️';
    default:
      return '💬';
  }
};

export function CustomersDashboard() {
  return (
    <div>
      <PageHeader title="Customers" />

      <div className="dashboard-container">
        <Card>
          <CardHeader>
            <CardTitle>Customer List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">
                      Name
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">
                      Email
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">
                      Phone
                    </th>

                    <th className="px-4 py-3 text-left font-semibold text-gray-700">
                      Messages
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">
                      Response Rate
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">
                      Last Message
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {customersData.map((customer) => (
                    <tr
                      key={customer.id}
                      className="border-b border-gray-100 transition-colors hover:bg-gray-50"
                    >
                      <td className="px-4 py-3 font-medium text-gray-900">
                        {customer.name}
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-600">
                        {customer.email}
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-600">
                        {customer.phone}
                      </td>

                      <td className="px-4 py-3 font-medium text-gray-700">
                        {customer.totalMessages}
                      </td>
                      <td className="px-4 py-3 text-gray-700">
                        {customer.responseRate}
                      </td>
                      <td className="px-4 py-3">
                        <Badge className={getStatusColor(customer.status)}>
                          {customer.status.charAt(0).toUpperCase() +
                            customer.status.slice(1)}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-600">
                        {customer.lastMessage}
                      </td>
                      <td className="px-4 py-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-1 text-blue-600 hover:text-blue-700"
                        >
                          <MessageCircle className="size-4" />
                          Message
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
