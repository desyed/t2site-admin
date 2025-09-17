'use client';

import {
  Facebook,
  Instagram,
  MessageCircle,
  MoreHorizontal,
  Search,
  Send,
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

interface FacebookDashboardProps {
  projectId: string;
}

export function FacebookDashboard({ projectId }: FacebookDashboardProps) {
  const [selectedConversation, setSelectedConversation] = useState<
    number | null
  >(1);

  const facebookPages = [
    {
      id: 1,
      name: 'TechCorp Solutions',
      followers: '12.5K',
      status: 'connected',
      platform: 'Facebook',
      messages: 45,
      engagement: '4.8%',
    },
    {
      id: 2,
      name: 'TechCorp Instagram',
      followers: '8.2K',
      status: 'connected',
      platform: 'Instagram',
      messages: 23,
      engagement: '6.2%',
    },
    {
      id: 3,
      name: 'TechCorp Support',
      followers: '3.1K',
      status: 'pending',
      platform: 'Facebook',
      messages: 0,
      engagement: '0%',
    },
  ];

  const conversations = [
    {
      id: 1,
      customer: 'Emma Thompson',
      message:
        'Hi! I saw your latest post about the new product launch. When will it be available?',
      time: '5 min ago',
      platform: 'Messenger',
      unread: 2,
      source: 'Facebook',
    },
    {
      id: 2,
      customer: 'David Chen',
      message:
        'Love the behind-the-scenes content! Can you provide more details about your pricing packages?',
      time: '15 min ago',
      platform: 'Comments',
      unread: 0,
      source: 'Instagram',
    },
    {
      id: 3,
      customer: 'Lisa Rodriguez',
      message:
        'Great product demo in your story! Is there a trial version available?',
      time: '1 hour ago',
      platform: 'DM',
      unread: 1,
      source: 'Instagram',
    },
    {
      id: 4,
      customer: 'Michael Brown',
      message:
        'Interested in bulk pricing for my company. Can we schedule a call?',
      time: '2 hours ago',
      platform: 'Messenger',
      unread: 3,
      source: 'Facebook',
    },
  ];

  const sampleMessages = [
    {
      id: 1,
      sender: 'customer',
      message: 'Hi! I saw your latest post about the new product launch',
      time: '2:30 PM',
    },
    {
      id: 2,
      sender: 'business',
      message:
        'Hello Emma! Thank you for your interest. Our new product will be launching next month. Would you like me to add you to our early access list?',
      time: '2:32 PM',
    },
    {
      id: 3,
      sender: 'customer',
      message: 'Yes, that would be great! When will it be available?',
      time: '2:35 PM',
    },
  ];

  return (
    <div>
      <PageHeader title="Facebook" />

      <div className="dashboard-container space-y-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {facebookPages.map((page) => (
            <Card key={page.id}>
              <CardContent className="p-4">
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {page.platform === 'Instagram' ? (
                      <Instagram className="size-4 text-pink-600" />
                    ) : (
                      <Facebook className="size-4 text-blue-600" />
                    )}
                    <h3 className="font-medium">{page.name}</h3>
                  </div>
                  <Badge
                    variant={
                      page.status === 'connected' ? 'default' : 'secondary'
                    }
                  >
                    {page.status}
                  </Badge>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Followers:</span>
                    <span className="font-medium">{page.followers}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Messages:</span>
                    <span className="font-medium">{page.messages}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Engagement:</span>
                    <span className="font-medium">{page.engagement}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-blue-100 p-2">
                  <MessageCircle className="size-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Messages Today</p>
                  <p className="text-2xl font-bold">68</p>
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
                  <p className="text-sm text-gray-600">Total Reach</p>
                  <p className="text-2xl font-bold">24.7K</p>
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
                  <p className="text-sm text-gray-600">Engagement Rate</p>
                  <p className="text-2xl font-bold">5.2%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-orange-100 p-2">
                  <MessageCircle className="size-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Response Time</p>
                  <p className="text-2xl font-bold">1.2m</p>
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
                          {conversation.source} {conversation.platform}
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
                            )?.source
                          }{' '}
                          {
                            conversations.find(
                              (c) => c.id === selectedConversation
                            )?.platform
                          }{' '}
                          • Active now
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
                          className={`flex ${message.sender === 'business' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-xs rounded-lg px-4 py-2 lg:max-w-md ${
                              message.sender === 'business'
                                ? 'bg-blue-500 text-white'
                                : 'border bg-white'
                            }`}
                          >
                            <p className="text-sm">{message.message}</p>
                            <p
                              className={`mt-1 text-xs ${
                                message.sender === 'business'
                                  ? 'text-blue-100'
                                  : 'text-gray-500'
                              }`}
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
