'use client';

import {
  Calendar,
  ChevronRight,
  Clock,
  MessageSquare,
  Users,
} from 'lucide-react';
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface AnalyticsDashboardProps {
  projectId: string;
}

const messageVolumeData = [
  { time: '3:00 PM', messages: 12 },
  { time: '4:00 PM', messages: 19 },
  { time: '5:00 PM', messages: 25 },
  { time: '6:00 PM', messages: 31 },
  { time: '7:00 PM', messages: 28 },
  { time: '8:00 PM', messages: 22 },
  { time: '9:00 PM', messages: 18 },
  { time: '10:00 PM', messages: 15 },
  { time: '11:00 PM', messages: 8 },
  { time: '12:00 AM', messages: 5 },
  { time: '1:00 AM', messages: 3 },
  { time: '2:00 AM', messages: 2 },
  { time: '3:00 AM', messages: 1 },
  { time: '4:00 AM', messages: 2 },
  { time: '5:00 AM', messages: 4 },
  { time: '6:00 AM', messages: 8 },
  { time: '7:00 AM', messages: 15 },
  { time: '8:00 AM', messages: 22 },
  { time: '9:00 AM', messages: 35 },
  { time: '10:00 AM', messages: 42 },
  { time: '11:00 AM', messages: 38 },
];

const channelData = [
  { channel: 'WhatsApp', messages: 156, color: '#25D366' },
  { channel: 'Facebook', messages: 89, color: '#1877F2' },
  { channel: 'Instagram', messages: 67, color: '#E4405F' },
  { channel: 'Email', messages: 43, color: '#EA4335' },
];

export function AnalyticsDashboard({ projectId }: AnalyticsDashboardProps) {
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Analytics</h1>
        <Select defaultValue="24h">
          <SelectTrigger className="w-48">
            <Calendar className="mr-2 size-4" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="24h">Last 24 hours</SelectItem>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <Card className="relative">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Messages
            </CardTitle>
            <MessageSquare className="size-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">1,247</div>
            <p className="mt-1 text-xs text-green-600">+12% from yesterday</p>
            <div className="mt-4 h-1 w-8 rounded-full bg-blue-500"></div>
          </CardContent>
        </Card>

        <Card className="relative">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Response Rate
            </CardTitle>
            <Clock className="size-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">94.2%</div>
            <p className="mt-1 text-xs text-green-600">+2.1% from yesterday</p>
            <div className="mt-4 h-1 w-8 rounded-full bg-green-500"></div>
          </CardContent>
        </Card>

        <Card className="relative">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Avg Response Time
            </CardTitle>
            <Users className="size-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">2.3m</div>
            <p className="mt-1 text-xs text-red-600">+0.5m from yesterday</p>
            <div className="mt-4 h-1 w-8 rounded-full bg-orange-500"></div>
          </CardContent>
        </Card>

        <Card className="relative">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Active Conversations
            </CardTitle>
            <Button variant="ghost" size="sm" className="size-6 p-0">
              <ChevronRight className="size-4 text-gray-400" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">23</div>
            <p className="mt-1 text-xs text-blue-600">5 waiting response</p>
            <div className="mt-4 h-1 w-8 rounded-full bg-purple-500"></div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Message Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={messageVolumeData}>
                  <XAxis
                    dataKey="time"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#6B7280' }}
                    interval="preserveStartEnd"
                  />
                  <YAxis hide />
                  <Line
                    type="monotone"
                    dataKey="messages"
                    stroke="#3B82F6"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4, fill: '#3B82F6' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Messages by Channel</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={channelData} layout="horizontal">
                  <XAxis type="number" hide />
                  <YAxis
                    type="category"
                    dataKey="channel"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#6B7280' }}
                    width={80}
                  />
                  <Bar
                    dataKey="messages"
                    fill="#8884d8"
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {channelData.map((channel) => (
                <div
                  key={channel.channel}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="size-3 rounded-full"
                      style={{ backgroundColor: channel.color }}
                    />
                    <span className="text-sm text-gray-600">
                      {channel.channel}
                    </span>
                  </div>
                  <span className="text-sm font-medium">
                    {channel.messages}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
