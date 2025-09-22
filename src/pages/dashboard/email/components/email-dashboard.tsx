'use client';

import {
  Clock,
  MessageCircle,
  MoreVertical,
  Phone,
  Search,
  Send,
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
import { Textarea } from '@/components/ui/textarea';

interface emailDashboardProps {
  projectId: string;
}

export function EmailDashboard({ projectId }: emailDashboardProps) {
  const [selectedChat, setSelectedChat] = useState<number | null>(1);

  const emailAccounts = [
    {
      id: 1,
      name: 'Main Business',
      phone: '+1 (555) 123-4567',
      status: 'connected',
      messages: 89,
    },
    {
      id: 2,
      name: 'Customer Support',
      phone: '+1 (555) 987-6543',
      status: 'connected',
      messages: 156,
    },
    {
      id: 3,
      name: 'Sales Team',
      phone: '+1 (555) 456-7890',
      status: 'pending',
      messages: 0,
    },
  ];

  const conversations = [
    {
      id: 1,
      customer: 'Maria Garcia',
      phone: '+1 (555) 234-5678',
      message:
        "Hi! I'm interested in your premium package. Can you send me more details?",
      time: '3 min ago',
      unread: 2,
      status: 'online',
    },
    {
      id: 2,
      customer: 'James Wilson',
      phone: '+1 (555) 345-6789',
      message:
        'Thank you for the quick delivery! The product is exactly what I needed.',
      time: '15 min ago',
      unread: 0,
      status: 'offline',
    },
    {
      id: 3,
      customer: 'Priya Sharma',
      phone: '+1 (555) 456-7890',
      message:
        'Is there any discount available for bulk orders? I need 50 units.',
      time: '1 hour ago',
      unread: 1,
      status: 'online',
    },
    {
      id: 4,
      customer: 'Ahmed Hassan',
      phone: '+1 (555) 567-8901',
      message: 'Can you help me track my order? Order ID: WA12345',
      time: '2 hours ago',
      unread: 3,
      status: 'offline',
    },
  ];

  const chatMessages = [
    {
      id: 1,
      sender: 'customer',
      message: "Hi! I'm interested in your premium package",
      time: '2:30 PM',
      status: 'delivered',
    },
    {
      id: 2,
      sender: 'business',
      message:
        "Hello Maria! I'd be happy to help you with information about our premium package. What specific features are you most interested in?",
      time: '2:32 PM',
      status: 'read',
    },
    {
      id: 3,
      sender: 'customer',
      message:
        "I'm particularly interested in the analytics features and multi-channel support",
      time: '2:35 PM',
      status: 'delivered',
    },
    {
      id: 4,
      sender: 'business',
      message:
        'Perfect! Our premium package includes advanced analytics dashboard, support for email, Facebook, Instagram, and Email, plus priority customer support.',
      time: '2:37 PM',
      status: 'read',
    },
    {
      id: 5,
      sender: 'customer',
      message: 'That sounds great! Can you send me more details?',
      time: '2:40 PM',
      status: 'delivered',
    },
  ];

  return (
    <div>
      <PageHeader title="Email" />

      <div className="dashboard-container space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-green-100 p-2">
                  <MessageCircle className="size-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Messages Today</p>
                  <p className="text-2xl font-bold">245</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-blue-100 p-2">
                  <Users className="size-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Active Chats</p>
                  <p className="text-2xl font-bold">18</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-orange-100 p-2">
                  <Clock className="size-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Avg Response</p>
                  <p className="text-2xl font-bold">1.8m</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-purple-100 p-2">
                  <Phone className="size-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Delivery Rate</p>
                  <p className="text-2xl font-bold">98.5%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chat Interface */}
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
                      selectedChat === conversation.id
                        ? 'border-l-green-500 bg-green-50'
                        : 'border-l-transparent'
                    }`}
                    onClick={() => setSelectedChat(conversation.id)}
                  >
                    <div className="relative">
                      <Avatar className="size-10">
                        <AvatarFallback>
                          {conversation.customer
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div
                        className={`absolute -bottom-1 -right-1 size-3 rounded-full border-2 border-white ${
                          conversation.status === 'online'
                            ? 'bg-green-500'
                            : 'bg-gray-400'
                        }`}
                      />
                    </div>
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
                      <p className="mt-1 text-xs text-gray-500">
                        {conversation.phone}
                      </p>
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
                  {selectedChat ? (
                    <>
                      <div className="relative">
                        <Avatar className="size-8">
                          <AvatarFallback>
                            {conversations
                              .find((c) => c.id === selectedChat)
                              ?.customer.split(' ')
                              .map((n) => n[0])
                              .join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div
                          className={`absolute -bottom-1 -right-1 size-3 rounded-full border-2 border-white ${
                            conversations.find((c) => c.id === selectedChat)
                              ?.status === 'online'
                              ? 'bg-green-500'
                              : 'bg-gray-400'
                          }`}
                        />
                      </div>
                      <div>
                        <CardTitle className="text-lg">
                          {
                            conversations.find((c) => c.id === selectedChat)
                              ?.customer
                          }
                        </CardTitle>
                        <CardDescription>
                          {
                            conversations.find((c) => c.id === selectedChat)
                              ?.phone
                          }{' '}
                          •
                          {conversations.find((c) => c.id === selectedChat)
                            ?.status === 'online'
                            ? ' Online'
                            : ' Last seen recently'}
                        </CardDescription>
                      </div>
                    </>
                  ) : (
                    <CardTitle>Select a conversation</CardTitle>
                  )}
                </div>
                {selectedChat && (
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="size-4" />
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {selectedChat ? (
                <div className="space-y-4">
                  <div className="h-96 overflow-y-auto rounded-lg border bg-gray-50 p-4">
                    <div className="space-y-4">
                      {chatMessages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.sender === 'business' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-xs rounded-lg px-4 py-2 lg:max-w-md ${
                              message.sender === 'business'
                                ? 'bg-green-500 text-white'
                                : 'border bg-white'
                            }`}
                          >
                            <p className="text-sm">{message.message}</p>
                            <div
                              className={`mt-1 flex items-center justify-between ${
                                message.sender === 'business'
                                  ? 'text-green-100'
                                  : 'text-gray-500'
                              }`}
                            >
                              <p className="text-xs">{message.time}</p>
                              {message.sender === 'business' && (
                                <span className="text-xs">✓✓</span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Textarea
                      placeholder="Type your message..."
                      className="max-h-[120px] min-h-[40px] flex-1"
                      rows={1}
                    />
                    <Button>
                      <Send className="size-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex h-96 items-center justify-center text-gray-500">
                  <div className="text-center">
                    <MessageCircle className="mx-auto mb-4 size-12 text-gray-300" />
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
