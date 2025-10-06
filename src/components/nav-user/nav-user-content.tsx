import { UserPreferencesSection } from './user-preferences-section';
import { UserProfileSection } from './user-profile-section';

export default function NavUserContent() {
  return (
    <>
      <div className="site-scrollbar max-h-screen overflow-x-hidden">
        <UserProfileSection />

        <UserPreferencesSection />
      </div>
    </>
  );
}
