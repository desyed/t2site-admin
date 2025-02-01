
export function createOrganizationInvitationLink(key: string) {
  if (typeof window === 'object') {
    return `${window.location.origin}/invite/${key}`;
  }
  return `${import.meta.env.VITE_BASE_URL}/organization/invite/${key}`;
}