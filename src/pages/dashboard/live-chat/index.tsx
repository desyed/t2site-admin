import { LiveChatDashboard } from './components/live-chat-dashboard';

interface LiveChatPageProps {
  params?: { projectId: string };
}

export default function LiveChatPage({ params }: LiveChatPageProps) {
  return (
    <LiveChatDashboard projectId={params ? params.projectId : 'project-1'} />
  );
}
