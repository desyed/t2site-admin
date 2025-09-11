import { AnalyticsDashboard } from './components/analytics-dashboard';

interface AnalyticsPageProps {
  params?: { projectId: string };
}

export default function AnalyticsPage({ params }: AnalyticsPageProps) {
  return (
    <AnalyticsDashboard projectId={params ? params.projectId : 'project-1'} />
  );
}
