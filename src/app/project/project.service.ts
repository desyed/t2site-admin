export function createProjectScriptTag(siteId: string) {
  return `<script src="${import.meta.env.VITE_BACKEND_URL}/services/${siteId}/cdn/script.js" async defer>
</script>`;
}
