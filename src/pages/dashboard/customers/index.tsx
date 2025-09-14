import { CustomersDashboard } from './components/customers-dashboard';

interface CustomersPageProps {
  params?: { projectId: string };
}

export default function CustomersPage({ params }: CustomersPageProps) {
  return (
    <CustomersDashboard projectId={params ? params.projectId : 'project-1'} />
  );
}
