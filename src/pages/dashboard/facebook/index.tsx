import { FacebookDashboard } from './components/facebook-dashboard';

interface FacebookPageProps {
  params?: { projectId: string };
}

export default function FacebookPage({ params }: FacebookPageProps) {
  return (
    <FacebookDashboard projectId={params ? params.projectId : 'project-1'} />
  );
}
