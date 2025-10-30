'use client';

import { PageHeader } from '@/components/dashboard/page-header';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

const eventsData = [
  {
    id: 'evt_001',
    type: 'Message Received',
    channel: 'WhatsApp',
    customer: 'John Smith',
    timestamp: '2024-10-30 14:32:15',
    status: 'processed',
    details: 'Customer inquiry about product pricing',
  },
  {
    id: 'evt_002',
    type: 'Message Sent',
    channel: 'Facebook',
    customer: 'Sarah Johnson',
    timestamp: '2024-10-30 14:28:42',
    status: 'delivered',
    details: 'Automated response sent',
  },
  {
    id: 'evt_003',
    type: 'Conversation Started',
    channel: 'Instagram',
    customer: 'Mike Chen',
    timestamp: '2024-10-30 14:15:08',
    status: 'active',
    details: 'New DM conversation initiated',
  },
  {
    id: 'evt_004',
    type: 'Message Received',
    channel: 'Email',
    customer: 'Emma Wilson',
    timestamp: '2024-10-30 13:52:33',
    status: 'processed',
    details: 'Support ticket created',
  },
  {
    id: 'evt_005',
    type: 'Conversation Closed',
    channel: 'WhatsApp',
    customer: 'David Brown',
    timestamp: '2024-10-30 13:45:20',
    status: 'completed',
    details: 'Issue resolved',
  },
  {
    id: 'evt_006',
    type: 'Message Received',
    channel: 'Facebook',
    customer: 'Lisa Anderson',
    timestamp: '2024-10-30 13:22:15',
    status: 'processed',
    details: 'Customer feedback received',
  },
  {
    id: 'evt_007',
    type: 'Agent Assigned',
    channel: 'Email',
    customer: 'Robert Taylor',
    timestamp: '2024-10-30 13:10:45',
    status: 'active',
    details: 'Assigned to support team',
  },
  {
    id: 'evt_008',
    type: 'Message Received',
    channel: 'Instagram',
    customer: 'Jessica Lee',
    timestamp: '2024-10-30 12:58:30',
    status: 'processed',
    details: 'Product inquiry',
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'processed':
      return 'bg-green-100 text-green-800';
    case 'delivered':
      return 'bg-blue-100 text-blue-800';
    case 'active':
      return 'bg-purple-100 text-purple-800';
    case 'completed':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getChannelColor = (channel: string) => {
  switch (channel) {
    case 'WhatsApp':
      return 'bg-green-50 text-green-700 border-green-200';
    case 'Facebook':
      return 'bg-blue-50 text-blue-700 border-blue-200';
    case 'Instagram':
      return 'bg-pink-50 text-pink-700 border-pink-200';
    case 'Email':
      return 'bg-gray-50 text-gray-700 border-gray-200';
    default:
      return 'bg-gray-50 text-gray-700 border-gray-200';
  }
};

export function EventsDashboard() {
  return (
    <div>
      <PageHeader title="Events" />

      <div className="dashboard-container">
        <Card>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">
                      Event Type
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">
                      Channel
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">
                      Customer
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">
                      Details
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">
                      Timestamp
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {eventsData.map((event) => (
                    <tr
                      key={event.id}
                      className="border-b border-gray-100 transition-colors hover:bg-gray-50"
                    >
                      <td className="px-4 py-3 font-medium text-gray-900">
                        {event.type}
                      </td>
                      <td className="px-4 py-3">
                        <Badge
                          variant="outline"
                          className={`${getChannelColor(event.channel)}`}
                        >
                          {event.channel}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-gray-700">
                        {event.customer}
                      </td>
                      <td className="max-w-xs truncate px-4 py-3 text-gray-600">
                        {event.details}
                      </td>
                      <td className="px-4 py-3">
                        <Badge className={getStatusColor(event.status)}>
                          {event.status.charAt(0).toUpperCase() +
                            event.status.slice(1)}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-600">
                        {event.timestamp}
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
