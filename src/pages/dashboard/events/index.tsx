import { EventsDashboard } from './components/events-dashboard';

interface EventsPageProps {
  params?: { projectId: string };
}

export default function EventsPage({ params }: EventsPageProps) {
  return (
    <EventsDashboard projectId={params ? params.projectId : 'project-1'} />
  );
}
