'use client';

import {
  Clock,
  MessageSquare,
  MoreHorizontal,
  Search,
  TrendingUp,
  Users,
} from 'lucide-react';
import { useState } from 'react';

import { PageHeader } from '@/components/dashboard/page-header';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface LiveChatDashboardProps {
  projectId: string;
}

export function LiveChatDashboard({ projectId }: LiveChatDashboardProps) {
  const [selectedConversation, setSelectedConversation] = useState<
    number | null
  >(null);

  const conversations = [
    {
      id: 1,
      customer: 'John Doe',
      message: 'Hi, I need help with my recent order #12345',
      time: '2 min ago',
      status: 'active',
      channel: 'WhatsApp',
      unread: 2,
    },
    {
      id: 2,
      customer: 'Sarah Wilson',
      message: 'Can you help me with billing? I was charged twice',
      time: '5 min ago',
      status: 'waiting',
      channel: 'Facebook',
      unread: 1,
    },
    {
      id: 3,
      customer: 'Mike Johnson',
      message: 'Thank you for your help! Issue resolved',
      time: '1 hour ago',
      status: 'resolved',
      channel: 'Instagram',
      unread: 0,
    },
    {
      id: 4,
      customer: 'Emma Davis',
      message: 'Is there a discount available for bulk orders?',
      time: '2 hours ago',
      status: 'active',
      channel: 'WhatsApp',
      unread: 3,
    },
    {
      id: 5,
      customer: 'Alex Chen',
      message: 'Product delivery status update needed',
      time: '3 hours ago',
      status: 'waiting',
      channel: 'Email',
      unread: 1,
    },
  ];

  const sampleMessages = [
    {
      id: 1,
      sender: 'customer',
      message: 'Hi, I need help with my recent order #12345',
      time: '2:30 PM',
    },
    {
      id: 2,
      sender: 'agent',
      message:
        "Hello! I'd be happy to help you with your order. Let me look that up for you.",
      time: '2:31 PM',
    },
    {
      id: 3,
      sender: 'customer',
      message: "Thank you! I haven't received any tracking information yet.",
      time: '2:32 PM',
    },
  ];

  return (
    <div>
      <PageHeader title="Live Chat" />

      <div className="dashboard-container">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-blue-100 p-2">
                  <MessageSquare className="size-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Active Chats</p>
                  <p className="text-2xl font-bold">3</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-yellow-100 p-2">
                  <Clock className="size-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Waiting</p>
                  <p className="text-2xl font-bold">1</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-green-100 p-2">
                  <Users className="size-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Resolved Today</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-purple-100 p-2">
                  <TrendingUp className="size-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Avg Response</p>
                  <p className="text-2xl font-bold">2.3m</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-1">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Conversations</CardTitle>
                <Badge variant="secondary">{conversations.length}</Badge>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search conversations..."
                  className="pl-10"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`flex cursor-pointer items-center gap-3 border-l-4 p-4 hover:bg-gray-50 ${
                      selectedConversation === conversation.id
                        ? 'border-l-blue-500 bg-blue-50'
                        : 'border-l-transparent'
                    }`}
                    onClick={() => setSelectedConversation(conversation.id)}
                  >
                    <Avatar className="size-10">
                      <AvatarFallback>
                        {conversation.customer
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <p className="truncate text-sm font-medium">
                          {conversation.customer}
                        </p>
                        <div className="flex items-center gap-1">
                          {conversation.unread > 0 && (
                            <Badge
                              variant="destructive"
                              className="size-5 p-0 text-xs"
                            >
                              {conversation.unread}
                            </Badge>
                          )}
                          <span className="text-xs text-gray-500">
                            {conversation.time}
                          </span>
                        </div>
                      </div>
                      <p className="truncate text-sm text-gray-600">
                        {conversation.message}
                      </p>
                      <div className="mt-1 flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">
                          {conversation.channel}
                        </Badge>
                        <Badge
                          variant={
                            conversation.status === 'active'
                              ? 'default'
                              : conversation.status === 'waiting'
                                ? 'secondary'
                                : 'outline'
                          }
                          className="text-xs"
                        >
                          {conversation.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {selectedConversation ? (
                    <>
                      <Avatar className="size-8">
                        <AvatarFallback>
                          {conversations
                            .find((c) => c.id === selectedConversation)
                            ?.customer.split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">
                          {
                            conversations.find(
                              (c) => c.id === selectedConversation
                            )?.customer
                          }
                        </CardTitle>
                        <CardDescription>
                          via{' '}
                          {
                            conversations.find(
                              (c) => c.id === selectedConversation
                            )?.channel
                          }{' '}
                          • Online
                        </CardDescription>
                      </div>
                    </>
                  ) : (
                    <CardTitle>Select a conversation</CardTitle>
                  )}
                </div>
                {selectedConversation && (
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="size-4" />
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {selectedConversation ? (
                <div className="space-y-4">
                  <div className="h-96 overflow-y-auto rounded-lg border bg-gray-50 p-4">
                    <div className="space-y-4">
                      {sampleMessages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.sender === 'agent' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-xs rounded-lg px-4 py-2 lg:max-w-md ${
                              message.sender === 'agent'
                                ? 'bg-blue-500 text-white'
                                : 'border bg-white'
                            }`}
                          >
                            <p className="text-sm">{message.message}</p>
                            <p
                              className={`mt-1 text-xs ${message.sender === 'agent' ? 'text-blue-100' : 'text-gray-500'}`}
                            >
                              {message.time}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type your message..."
                      className="flex-1"
                    />
                    <Button>Send</Button>
                  </div>
                </div>
              ) : (
                <div className="flex h-96 items-center justify-center text-gray-500">
                  <div className="text-center">
                    <MessageSquare className="mx-auto mb-4 size-12 text-gray-300" />
                    <p>Select a conversation to start chatting</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
