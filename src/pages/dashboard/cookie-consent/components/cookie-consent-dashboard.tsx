'use client';

import { ArrowLeft, Eye, Lock, Palette, Settings } from 'lucide-react';
import { useState } from 'react';
import { useSearchParams } from 'react-router';

import { PageHeader } from '@/components/dashboard/page-header';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';

interface CookieConsentDashboardProps {
  projectId: string;
}

export function CookieConsentDashboard({
  projectId,
}: CookieConsentDashboardProps) {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') || 'banner';
  const [navigation, setNavigation] = useState({
    level: 'category',
    category: '',
    item: '',
  });

  const [primaryColor, setPrimaryColor] = useState('#3B82F6');
  const [bannerPosition, setBannerPosition] = useState('Bottom');
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);

  const categories = {
    banner: {
      name: 'Banner Settings',
      icon: Palette,
      items: [
        {
          id: 'appearance',
          name: 'Banner Appearance',
          description: 'Customize colors, position, and styling',
        },
        {
          id: 'content',
          name: 'Banner Content',
          description: 'Edit banner text and messaging',
        },
        {
          id: 'behavior',
          name: 'Banner Behavior',
          description: 'Configure display rules and timing',
        },
      ],
    },
    categories: {
      name: 'Cookie Categories',
      icon: Settings,
      items: [
        {
          id: 'essential',
          name: 'Essential Cookies',
          description: 'Manage required cookies',
        },
        {
          id: 'analytics',
          name: 'Analytics Cookies',
          description: 'Configure tracking preferences',
        },
        {
          id: 'marketing',
          name: 'Marketing Cookies',
          description: 'Set advertising cookie rules',
        },
      ],
    },
    legal: {
      name: 'Legal Compliance',
      icon: Lock,
      items: [
        {
          id: 'gdpr',
          name: 'GDPR Compliance',
          description: 'European privacy regulation settings',
        },
        {
          id: 'ccpa',
          name: 'CCPA Compliance',
          description: 'California privacy law settings',
        },
        {
          id: 'reports',
          name: 'Compliance Reports',
          description: 'View consent metrics and reports',
        },
      ],
    },
  };

  const currentCategory = categories[category as keyof typeof categories];

  const renderBannerAppearance = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Banner Customization</CardTitle>
          <CardDescription>
            Customize the appearance of your consent banner
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">Banner Position</label>
            <select
              className="mt-1 w-full rounded-md border p-2"
              value={bannerPosition}
              onChange={(e) => setBannerPosition(e.target.value)}
            >
              <option>Bottom</option>
              <option>Top</option>
              <option>Center</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium">Primary Color</label>
            <div className="mt-1 flex items-center gap-2">
              <div
                className="size-8 rounded border"
                style={{ backgroundColor: primaryColor }}
              ></div>
              <input
                type="text"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="flex-1 rounded-md border p-2"
              />
            </div>
          </div>
          <Button className="w-full">
            <Eye className="mr-2 size-4" />
            Preview Banner
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderComplianceReports = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Compliance Reports</CardTitle>
          <CardDescription>
            Track consent rates and compliance metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-lg bg-gray-50 p-4 text-center">
              <p className="text-2xl font-bold text-gray-900">94.2%</p>
              <p className="text-sm text-gray-600">Consent Rate</p>
            </div>
            <div className="rounded-lg bg-gray-50 p-4 text-center">
              <p className="text-2xl font-bold text-gray-900">1,247</p>
              <p className="text-sm text-gray-600">Total Consents</p>
            </div>
            <div className="rounded-lg bg-gray-50 p-4 text-center">
              <p className="text-2xl font-bold text-gray-900">76</p>
              <p className="text-sm text-gray-600">Opt-outs</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAnalyticsCookies = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Analytics Cookie Settings</CardTitle>
          <CardDescription>
            Configure analytics and tracking preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Google Analytics</p>
              <p className="text-sm text-gray-600">
                Track website usage and performance
              </p>
            </div>
            <Switch
              checked={analyticsEnabled}
              onCheckedChange={setAnalyticsEnabled}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Hotjar</p>
              <p className="text-sm text-gray-600">
                User behavior and heatmap tracking
              </p>
            </div>
            <Switch checked={false} onCheckedChange={() => {}} />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderDetailedContent = () => {
    if (navigation.level === 'detail') {
      switch (navigation.item) {
        case 'appearance':
          return renderBannerAppearance();
        case 'reports':
          return renderComplianceReports();
        case 'analytics':
          return renderAnalyticsCookies();
        default:
          return (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-gray-600">
                  Content for {navigation.item} coming soon...
                </p>
              </CardContent>
            </Card>
          );
      }
    }
    return null;
  };

  if (navigation.level === 'detail') {
    return (
      <div className="nested-dashboard-container">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              setNavigation({ level: 'category', category: '', item: '' })
            }
            className="flex items-center gap-2"
          >
            <ArrowLeft className="size-4" />
            {currentCategory?.name}
          </Button>
          <h1 className="text-2xl font-semibold text-gray-900">
            {
              currentCategory?.items.find((item) => item.id === navigation.item)
                ?.name
            }
          </h1>
        </div>
        {renderDetailedContent()}
      </div>
    );
  }

  return (
    <div>
      <PageHeader title={currentCategory?.name} />

      <div className="dashboard-container">
        <div className="space-y-3">
          {currentCategory?.items.map((item) => (
            <Card
              key={item.id}
              className="cursor-pointer transition-shadow hover:shadow-md"
            >
              <CardContent className="p-4">
                <button
                  onClick={() =>
                    setNavigation({ level: 'detail', category, item: item.id })
                  }
                  className="w-full text-left"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">{item.name}</h3>
                      <p className="mt-1 text-sm text-gray-600">
                        {item.description}
                      </p>
                    </div>
                    <ArrowLeft className="size-4 rotate-180 text-gray-400" />
                  </div>
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
