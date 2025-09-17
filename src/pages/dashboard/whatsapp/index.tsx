import { WhatsappDashboard } from './components/whatsapp-dashboard';

interface WhatsappPageProps {
  params?: { projectId: string };
}

export default function WhatsappPage({ params }: WhatsappPageProps) {
  return (
    <WhatsappDashboard projectId={params ? params.projectId : 'project-1'} />
  );
}
