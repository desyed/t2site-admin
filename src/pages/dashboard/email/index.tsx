import { EmailDashboard } from './components/email-dashboard';

interface EmailPageProps {
  params?: { projectId: string };
}

export default function EmailPage({ params }: EmailPageProps) {
  return <EmailDashboard projectId={params ? params.projectId : 'project-1'} />;
}
