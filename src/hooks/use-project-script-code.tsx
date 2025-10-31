import { useLocation } from 'react-router';

export function useProjectScriptCode() {
  const location = useLocation();

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const match = location.pathname.match(/(t2s-prj_[^/]+)/);
  const projectPath = match ? match[1] : '';

  const code = projectPath
    ? `<script src="${backendUrl}/${projectPath}/scripts/main.js" async defer></script>`
    : '';

  return code;
}
