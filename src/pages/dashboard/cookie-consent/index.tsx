import { CookieConsentDashboard } from './components/cookie-consent-dashboard';

interface CookieConsentPageProps {
  params?: { projectId: string };
}

export default function CookieConsentPage({ params }: CookieConsentPageProps) {
  return (
    <CookieConsentDashboard
      projectId={params ? params.projectId : 'project-1'}
    />
  );
}
