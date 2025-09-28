'use client';

import {
  Settings,
  Globe,
  Users,
  Trash2,
  ArrowLeft,
  ChevronRight,
  Shield,
  Puzzle,
  Info,
  Code,
  MessageSquare,
  UserPlus,
  Edit,
  Slack,
  Send,
  Key,
  AlertTriangle,
  Copy,
  Check,
  Mail,
  Calendar,
  Zap,
} from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router';

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
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';

type MainCategory = 'general' | 'team' | 'integrations' | 'security';
type SubCategory = string;

interface NavigationState {
  level: 'category' | 'detail';
  category: MainCategory;
  subCategory?: SubCategory;
  title: string;
}

interface Member {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  lastActive: string;
  permissions: string[];
}

interface Integration {
  name: string;
  icon: any;
  description: string;
  connected: boolean;
  category: string;
}

interface Session {
  device: string;
  location: string;
  current: boolean;
  lastActive: string;
}

export function ProjectSettingsDashboard() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate(); // Added navigate for breadcrumb navigation
  const category = (searchParams.get('category') as MainCategory) || 'general';

  const params = useParams();
  const projectId = params.projectId || 'unknown';

  const [navigation, setNavigation] = useState<NavigationState>({
    level: 'category',
    category: category,
    title: '',
  });

  const mainCategories = useMemo(
    () => [
      {
        id: 'general' as MainCategory,
        title: 'General',
        description: 'Basic project information and configuration',
        icon: Settings,
        subCategories: [
          { id: 'project-info', title: 'Project Information', icon: Info },
          { id: 'web-integrations', title: 'Web Integrations', icon: Globe },
          {
            id: 'chat-widget',
            title: 'Chat Widget Configuration',
            icon: MessageSquare,
          },
        ],
      },
      {
        id: 'team' as MainCategory,
        title: 'Team Members',
        description: 'Manage team members and permissions',
        icon: Users,
        subCategories: [
          { id: 'members-list', title: 'Team Members', icon: Users },
          { id: 'invite-member', title: 'Invite Members', icon: UserPlus },
        ],
      },
      {
        id: 'integrations' as MainCategory,
        title: 'Integrations',
        description: 'Third-party integrations and API connections',
        icon: Puzzle,
        subCategories: [
          { id: 'code-snippet', title: 'Website Code Snippet', icon: Code },
          { id: 'third-party', title: 'Third Party APIs', icon: Puzzle },
        ],
      },
      {
        id: 'security' as MainCategory,
        title: 'Security',
        description: 'Security settings and account management',
        icon: Shield,
        subCategories: [
          { id: 'security-settings', title: 'Security Settings', icon: Shield },
          { id: 'delete-account', title: 'Delete Account', icon: Trash2 },
        ],
      },
    ],
    []
  );

  useEffect(() => {
    const categoryData = mainCategories.find((c) => c.id === category);
    setNavigation({
      level: 'category',
      category: category,
      title: categoryData?.title || 'General',
    });
  }, [category, mainCategories]);

  const [projectInfo, setProjectInfo] = useState({
    name: 'T2 live',
    website: 'https://t2live.com',
    description: 'Advanced communication management platform for businesses',
  });

  const [editingMember, setEditingMember] = useState<number | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [inviteForm, setInviteForm] = useState({
    email: '',
    role: 'Member',
    message: '',
  });

  const navigateToDetail = (subCategory: SubCategory) => {
    const categoryData = mainCategories.find(
      (c) => c.id === navigation.category
    );
    const subCategoryData = categoryData?.subCategories.find(
      (s) => s.id === subCategory
    );
    setNavigation({
      level: 'detail',
      category: navigation.category,
      subCategory,
      title: subCategoryData?.title || '',
    });
  };

  const navigateBack = () => {
    if (navigation.level === 'detail') {
      const categoryData = mainCategories.find(
        (c) => c.id === navigation.category
      );
      setNavigation({
        level: 'category',
        category: navigation.category,
        title: categoryData?.title || '',
      });
    }
  };

  const navigateToCategory = (categoryId: MainCategory) => {
    const categoryData = mainCategories.find((c) => c.id === categoryId);
    setNavigation({
      level: 'category',
      category: categoryId,
      title: categoryData?.title || '',
    });
    navigate(`/${projectId}/project-settings?category=${categoryId}`);
  };

  const copyCodeSnippet = () => {
    const code = `<script>
  (function(d,s,id){
    var js,fjs=d.getElementsByTagName(s)[0];
    if(d.getElementById(id))return;
    js=d.createElement(s);js.id=id;
    js.src="https://widget.t2live.com/widget.js";
    js.setAttribute('data-project-id','${projectId}');
    js.setAttribute('data-theme','auto');
    fjs.parentNode.insertBefore(js,fjs);
  }(document,'script','t2live-widget'));
</script>`;
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleSaveProject = () => {
    // Simulate API call
    // console.log('[v0] Saving project info:', projectInfo);
  };

  const handleInviteMember = () => {
    // Simulate API call
    // console.log('[v0] Inviting member:', inviteForm);
    setInviteForm({ email: '', role: 'Member', message: '' });
  };

  const renderCategorySubItems = () => {
    const categoryData = mainCategories.find(
      (c) => c.id === navigation.category
    );
    if (!categoryData) return null;

    return (
      <div className="space-y-3">
        {categoryData.subCategories.map((subCategory) => {
          const Icon = subCategory.icon;
          return (
            <Card
              key={subCategory.id}
              className="cursor-pointer transition-all duration-200 hover:border-blue-200 hover:shadow-md"
              onClick={() => navigateToDetail(subCategory.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Icon className="size-5 text-gray-600" />
                    <span className="font-medium text-gray-900">
                      {subCategory.title}
                    </span>
                  </div>
                  <ChevronRight className="size-5 text-gray-400" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    );
  };

  const renderDetailContent = () => {
    const key = `${navigation.category}-${navigation.subCategory}`;

    switch (key) {
      case 'general-project-info':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Project Information</CardTitle>
                <CardDescription>
                  Update your project&apos;s basic information and settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="project-name">Project Name</Label>
                  <Input
                    id="project-name"
                    value={projectInfo.name}
                    onChange={(e) =>
                      setProjectInfo({ ...projectInfo, name: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="website">Website URL</Label>
                  <Input
                    id="website"
                    value={projectInfo.website}
                    onChange={(e) =>
                      setProjectInfo({
                        ...projectInfo,
                        website: e.target.value,
                      })
                    }
                    placeholder="https://example.com"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Project Description</Label>
                  <Textarea
                    id="description"
                    value={projectInfo.description}
                    onChange={(e) =>
                      setProjectInfo({
                        ...projectInfo,
                        description: e.target.value,
                      })
                    }
                    placeholder="Describe your project and its purpose..."
                    className="mt-1"
                    rows={4}
                  />
                </div>
                <div className="flex gap-3">
                  <Button onClick={handleSaveProject}>Save Changes</Button>
                  <Button variant="outline">Reset</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'general-web-integrations':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Web Integrations</CardTitle>
                <CardDescription>
                  Configure website integrations and tracking
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Google Analytics</p>
                    <p className="text-sm text-gray-600">
                      Track website visitors and behavior
                    </p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Facebook Pixel</p>
                    <p className="text-sm text-gray-600">
                      Track conversions and optimize ads
                    </p>
                  </div>
                  <Switch />
                </div>
                <div>
                  <Label htmlFor="tracking-id">
                    Google Analytics Tracking ID
                  </Label>
                  <Input
                    id="tracking-id"
                    placeholder="GA-XXXXXXXXX-X"
                    className="mt-1"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'general-chat-widget':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Chat Widget Configuration</CardTitle>
                <CardDescription>
                  Customize your website chat widget
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Enable Chat Widget</p>
                    <p className="text-sm text-gray-600">
                      Show chat widget on your website
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div>
                  <Label htmlFor="widget-position">Widget Position</Label>
                  <select className="mt-1 w-full rounded-md border p-2">
                    <option>Bottom Right</option>
                    <option>Bottom Left</option>
                    <option>Top Right</option>
                    <option>Top Left</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="welcome-message">Welcome Message</Label>
                  <Input
                    id="welcome-message"
                    defaultValue="Hi! How can we help you today?"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="widget-color">Widget Color</Label>
                  <Input
                    id="widget-color"
                    type="color"
                    defaultValue="#3B82F6"
                    className="mt-1 h-10"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'team-members-list': {
        const members: Member[] = [
          {
            id: 1,
            name: 'Syed Shihab',
            email: 'syedshihabdu@gmail.com',
            role: 'Owner',
            status: 'Active',
            lastActive: '2 minutes ago',
            permissions: ['All'],
          },
          {
            id: 2,
            name: 'John Doe',
            email: 'john@example.com',
            role: 'Admin',
            status: 'Active',
            lastActive: '1 hour ago',
            permissions: ['Analytics', 'Chat', 'Settings'],
          },
          {
            id: 3,
            name: 'Jane Smith',
            email: 'jane@example.com',
            role: 'Member',
            status: 'Pending',
            lastActive: 'Never',
            permissions: ['Chat', 'Analytics'],
          },
          {
            id: 4,
            name: 'Mike Johnson',
            email: 'mike@example.com',
            role: 'Member',
            status: 'Active',
            lastActive: '3 days ago',
            permissions: ['Chat'],
          },
        ];
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Team Members</CardTitle>
                <CardDescription>
                  Manage your team members, roles, and permissions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {members.map((member) => (
                  <div
                    key={member.id}
                    className="space-y-3 rounded-lg border p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
                          <span className="text-lg font-semibold text-white">
                            {member.name
                              .split(' ')
                              .map((n) => n[0])
                              .join('')}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">
                            {member.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            {member.email}
                          </p>
                          <p className="text-xs text-gray-500">
                            Last active: {member.lastActive}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge
                          variant={
                            member.status === 'Active' ? 'default' : 'secondary'
                          }
                        >
                          {member.status}
                        </Badge>
                        <span className="text-sm font-medium text-gray-700">
                          {member.role}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            setEditingMember(
                              editingMember === member.id ? null : member.id
                            )
                          }
                        >
                          <Edit className="size-4" />
                        </Button>
                      </div>
                    </div>
                    {editingMember === member.id && (
                      <div className="space-y-3 border-t pt-3">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Label>Role</Label>
                            <select className="mt-1 w-full rounded-md border p-2 text-sm">
                              <option selected={member.role === 'Owner'}>
                                Owner
                              </option>
                              <option selected={member.role === 'Admin'}>
                                Admin
                              </option>
                              <option selected={member.role === 'Member'}>
                                Member
                              </option>
                              <option>Viewer</option>
                            </select>
                          </div>
                          <div>
                            <Label>Status</Label>
                            <select className="mt-1 w-full rounded-md border p-2 text-sm">
                              <option selected={member.status === 'Active'}>
                                Active
                              </option>
                              <option selected={member.status === 'Pending'}>
                                Pending
                              </option>
                              <option>Suspended</option>
                            </select>
                          </div>
                        </div>
                        <div>
                          <Label>Permissions</Label>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {[
                              'Analytics',
                              'Chat',
                              'Settings',
                              'Billing',
                              'Team Management',
                            ].map((permission) => (
                              <Badge
                                key={permission}
                                variant={
                                  member.permissions.includes(permission) ||
                                  member.permissions.includes('All')
                                    ? 'default'
                                    : 'outline'
                                }
                                className="cursor-pointer"
                              >
                                {permission}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm">Save Changes</Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEditingMember(null)}
                          >
                            Cancel
                          </Button>
                          {member.role !== 'Owner' && (
                            <Button variant="destructive" size="sm">
                              Remove Member
                            </Button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        );
      }

      case 'team-invite-member':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Invite Team Member</CardTitle>
                <CardDescription>
                  Send an invitation to join your team with specific permissions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="invite-email">Email Address</Label>
                  <Input
                    id="invite-email"
                    type="email"
                    value={inviteForm.email}
                    onChange={(e) =>
                      setInviteForm({ ...inviteForm, email: e.target.value })
                    }
                    placeholder="colleague@example.com"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="invite-role">Role & Permissions</Label>
                  <select
                    className="mt-1 w-full rounded-md border p-2"
                    value={inviteForm.role}
                    onChange={(e) =>
                      setInviteForm({ ...inviteForm, role: e.target.value })
                    }
                  >
                    <option value="Member">
                      Member - Chat access and basic analytics
                    </option>
                    <option value="Admin">
                      Admin - Full access except billing
                    </option>
                    <option value="Viewer">
                      Viewer - Read-only access to analytics
                    </option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="invite-message">
                    Personal Message (Optional)
                  </Label>
                  <Textarea
                    id="invite-message"
                    value={inviteForm.message}
                    onChange={(e) =>
                      setInviteForm({ ...inviteForm, message: e.target.value })
                    }
                    placeholder="Hi! I'd like to invite you to join our team..."
                    className="mt-1"
                    rows={3}
                  />
                </div>
                <Button className="w-full" onClick={handleInviteMember}>
                  <UserPlus className="mr-2 size-4" />
                  Send Invitation
                </Button>
              </CardContent>
            </Card>
          </div>
        );

      case 'integrations-code-snippet':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Website Integration Code</CardTitle>
                <CardDescription>
                  Add this code snippet to your website to enable chat
                  functionality
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Installation Instructions</Label>
                  <div className="mt-2 rounded-lg bg-blue-50 p-4 text-sm">
                    <p className="mb-2 font-medium">
                      1. Copy the code snippet below
                    </p>
                    <p className="mb-2">
                      2. Paste it before the closing &lt;/body&gt; tag on your
                      website
                    </p>
                    <p>
                      3. The chat widget will automatically appear on your site
                    </p>
                  </div>
                </div>
                <div>
                  <Label>Code Snippet</Label>
                  <div className="relative mt-2">
                    <pre className="overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm text-green-400">
                      <code>{`<script>
  (function(d,s,id){
    var js,fjs=d.getElementsByTagName(s)[0];
    if(d.getElementById(id))return;
    js=d.createElement(s);js.id=id;
    js.src="https://widget.t2live.com/widget.js";
    js.setAttribute('data-project-id','${projectId}');
    js.setAttribute('data-theme','auto');
    fjs.parentNode.insertBefore(js,fjs);
  }(document,'script','t2live-widget'));
</script>`}</code>
                    </pre>
                    <Button
                      variant="outline"
                      size="sm"
                      className="absolute right-2 top-2 bg-transparent"
                      onClick={copyCodeSnippet}
                    >
                      {copiedCode ? (
                        <Check className="size-4" />
                      ) : (
                        <Copy className="size-4" />
                      )}
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg border p-3">
                    <h4 className="mb-1 font-medium">Widget Status</h4>
                    <Badge variant="default">Active</Badge>
                  </div>
                  <div className="rounded-lg border p-3">
                    <h4 className="mb-1 font-medium">Last Updated</h4>
                    <p className="text-sm text-gray-600">2 hours ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'integrations-third-party': {
        const integrations: Integration[] = [
          {
            name: 'Slack',
            icon: Slack,
            description: 'Get real-time notifications in Slack channels',
            connected: true,
            category: 'Communication',
          },
          {
            name: 'Telegram',
            icon: Send,
            description: 'Receive messages and alerts via Telegram bot',
            connected: false,
            category: 'Communication',
          },
          {
            name: 'Email Notifications',
            icon: Mail,
            description: 'Send email alerts for new messages',
            connected: true,
            category: 'Communication',
          },
          {
            name: 'Zapier',
            icon: Zap,
            description: 'Automate workflows with 5000+ apps',
            connected: false,
            category: 'Automation',
          },
          {
            name: 'Google Calendar',
            icon: Calendar,
            description: 'Schedule meetings from chat conversations',
            connected: false,
            category: 'Productivity',
          },
          {
            name: 'Custom Webhook',
            icon: Code,
            description: 'Send data to custom webhook URLs',
            connected: true,
            category: 'Developer',
          },
        ];
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Third Party Integrations</CardTitle>
                <CardDescription>
                  Connect with external services to enhance your workflow
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {integrations.map((integration, index) => {
                  const Icon = integration.icon;
                  return (
                    <div key={index} className="rounded-lg border p-4">
                      <div className="mb-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="rounded-lg bg-gray-50 p-2">
                            <Icon className="size-5 text-gray-700" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-semibold">
                                {integration.name}
                              </p>
                              <Badge variant="outline" className="text-xs">
                                {integration.category}
                              </Badge>
                            </div>
                            <p className="mt-1 text-sm text-gray-600">
                              {integration.description}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge
                            variant={
                              integration.connected ? 'default' : 'secondary'
                            }
                          >
                            {integration.connected ? 'Connected' : 'Available'}
                          </Badge>
                          <Button variant="outline" size="sm">
                            {integration.connected ? 'Configure' : 'Connect'}
                          </Button>
                        </div>
                      </div>
                      {integration.connected && (
                        <div className="border-t pt-3">
                          <p className="text-xs text-gray-500">
                            {integration.name === 'Slack' &&
                              'Connected to #customer-support channel'}
                            {integration.name === 'Email Notifications' &&
                              'Sending to admin@t2live.com'}
                            {integration.name === 'Custom Webhook' &&
                              'Endpoint: https://api.example.com/webhook'}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        );
      }

      case 'security-security-settings': {
        const sessions: Session[] = [
          {
            device: 'Chrome on Windows',
            location: 'New York, US',
            current: true,
            lastActive: 'Now',
          },
          {
            device: 'Safari on iPhone',
            location: 'New York, US',
            current: false,
            lastActive: '2 hours ago',
          },
          {
            device: 'Firefox on Mac',
            location: 'London, UK',
            current: false,
            lastActive: '1 day ago',
          },
        ];
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Security & Authentication</CardTitle>
                <CardDescription>
                  Manage your account security settings and access controls
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-gray-600">
                        Secure your account with 2FA using authenticator app
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <p className="font-medium">Login Notifications</p>
                      <p className="text-sm text-gray-600">
                        Get notified of new login attempts
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <p className="font-medium">Session Timeout</p>
                      <p className="text-sm text-gray-600">
                        Auto-logout after 24 hours of inactivity
                      </p>
                    </div>
                    <Switch />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Change Password</h4>
                  <div>
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input
                      id="current-password"
                      type="password"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="confirm-password">
                      Confirm New Password
                    </Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      className="mt-1"
                    />
                  </div>
                  <Button>
                    <Key className="mr-2 size-4" />
                    Update Password
                  </Button>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Active Sessions</h4>
                  <div className="space-y-2">
                    {sessions.map((session, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between rounded-lg border p-3"
                      >
                        <div>
                          <p className="text-sm font-medium">
                            {session.device}
                          </p>
                          <p className="text-xs text-gray-600">
                            {session.location} • {session.lastActive}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          {session.current && (
                            <Badge variant="default" className="text-xs">
                              Current
                            </Badge>
                          )}
                          {!session.current && (
                            <Button variant="outline" size="sm">
                              Revoke
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      }

      case 'security-delete-account':
        return (
          <div className="space-y-6">
            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-600">
                  <AlertTriangle className="size-5" />
                  Delete Account
                </CardTitle>
                <CardDescription>
                  Permanently delete your account and all associated data
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg bg-red-50 p-4">
                  <h4 className="mb-2 font-medium text-red-900">
                    This action cannot be undone
                  </h4>
                  <p className="mb-4 text-sm text-red-700">
                    Deleting your account will permanently remove all your
                    projects, team members, chat history, and settings. This
                    action is irreversible.
                  </p>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="delete-confirmation">
                        Type &quot;DELETE&quot; to confirm
                      </Label>
                      <Input
                        id="delete-confirmation"
                        placeholder="DELETE"
                        className="mt-1"
                      />
                    </div>
                    <Button variant="destructive" className="w-full">
                      <Trash2 className="mr-2 size-4" />
                      Delete Account Permanently
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return <div>Content not found</div>;
    }
  };

  return (
    <div className="mx-auto max-w-4xl p-6">
      <div className="mb-6">
        <div className="mb-2 flex items-center gap-3">
          {navigation.level === 'detail' && (
            <Button
              variant="ghost"
              size="sm"
              onClick={navigateBack}
              className="p-2"
            >
              <ArrowLeft className="size-4" />
            </Button>
          )}

          <h1 className="text-2xl font-semibold text-gray-900">
            {navigation.title}
          </h1>
        </div>
        {navigation.level === 'category' && (
          <p className="text-gray-600">
            Configure settings for {navigation.title.toLowerCase()}
          </p>
        )}
      </div>

      <div className="transition-all duration-300 ease-in-out">
        {navigation.level === 'category' && renderCategorySubItems()}
        {navigation.level === 'detail' && renderDetailContent()}
      </div>
    </div>
  );
}
