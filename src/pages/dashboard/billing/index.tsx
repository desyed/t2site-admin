import { BillingDashboard } from './components/billing-dashboard';

interface BillingPageProps {
  params?: { projectId: string };
}

export default function BillingPage({ params }: BillingPageProps) {
  return (
    <BillingDashboard projectId={params ? params.projectId : 'project-1'} />
  );
}
