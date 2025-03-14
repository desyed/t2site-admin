import NotFoundPage from '@/components/not-found-page';

export default function NotFoundSettings() {
  return (
    <NotFoundPage
      title="404"
      description="Sorry, the page you are looking for does not exist."
      buttonText="Go to Settings"
      buttonLink="/settings"
    />
  );
}
