import { useAuthStore } from '@/app/auth/auth.store';

import { CurrentOrganizationSection } from './current-organization-section';
import { UserPreferencesSection } from './user-preferences-section';
import { UserProfileSection } from './user-profile-section';

export default function NavUserContent({
  privateLayout = false,
}: {
  privateLayout?: boolean;
}) {
  const userOrganizations = useAuthStore((state) => state.userOrganization);
  return (
    <>
      <div className="site-scrollbar max-h-screen overflow-x-hidden">
        <UserProfileSection />

        {!privateLayout && (
          <>
            {userOrganizations?.currentOrganization && (
              <CurrentOrganizationSection />
            )}
          </>
        )}
        <UserPreferencesSection />
      </div>
    </>
  );
}
