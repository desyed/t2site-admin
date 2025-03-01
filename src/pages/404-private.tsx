import NotFoundPage from '@/components/not-found-page';

export default function NotFoundPrivate() {
  return (
    <NotFoundPage
      title="404"
      description="Sorry, the page you are looking for does not exist."
      buttonText="Go to dashboard"
      buttonLink="/"
    />
  );
}
