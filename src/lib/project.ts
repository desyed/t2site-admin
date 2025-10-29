export function createProjectInvitationLink(key: string) {
  if (typeof window === 'object') {
    return `${window.location.origin}/invitation/${key}`;
  }
  return `${import.meta.env.VITE_BASE_URL}/invitation/${key}`;
}
