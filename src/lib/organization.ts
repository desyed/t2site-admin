
export function createOrganizationInvitationLink(key: string) {
  if (typeof window === 'object') {
    return `${window.location.origin}/invitation/${key}`;
  }
  return `${import.meta.env.VITE_BASE_URL}/organization/invitation/${key}`;
}