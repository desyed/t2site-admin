import { getProfileQuery, getSessionQuery } from '@/app/auth/authApi';
import { Button } from '@/components/ui/button';
import { logDev } from '@/lib/utils';

export async function loader() {
  return {
    title: 'Dashboard',
  };
}
export function Component() {
  return (
    <div className="mt-5 flex flex-1 flex-col gap-4 p-5 pt-0">
      <div className="flex gap-4">
        <Button
          onClick={async () => {
            const session = await getSessionQuery();
            logDev(session.data);
          }}
        >
          Fetch Session If user is just authenticate
        </Button>
        <Button
          onClick={async () => {
            const profile = await getProfileQuery();
            logDev(profile.data);
          }}
        >
          Fetch Profile If user is verified
        </Button>
      </div>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-xl bg-muted" />
        <div className="aspect-video rounded-xl bg-muted" />
        <div className="aspect-video rounded-xl bg-muted" />
      </div>
      <div className="min-h-screen flex-1 rounded-xl bg-muted md:min-h-min" />
    </div>
  );
}
