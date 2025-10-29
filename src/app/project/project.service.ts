export function createProjectScriptTag(siteId: string) {
  return `<script 
  src="${import.meta.env.VITE_BACKEND_URL}/${siteId}/scripts/main.js" async defer>
</script>`;
}
