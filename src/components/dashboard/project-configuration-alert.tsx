import { AlertCircle, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation, useParams } from 'react-router';

import { AlertDescription, Alert } from '../ui/alert';
import { Button } from '../ui/button';

const ProjectConfigurationAlert = () => {
  const [isVisible, setIsVisible] = useState(true);

  const { projectId } = useParams();

  const location = useLocation();

  const isProjectSettingsPage = location.pathname.includes('project-settings');

  return (
    <>
      {!isProjectSettingsPage && isVisible && (
        <Alert className="rounded-b-none border-orange-200 bg-orange-50">
          <AlertDescription className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-orange-800">
              <AlertCircle className="size-4 text-orange-600" /> Your project
              needs to be configured to enable Live Chatting feature.
            </div>
            <div className="flex items-center gap-2">
              <Link
                className="rounded-lg bg-primary px-5 py-2 font-medium text-white"
                to={`/${projectId}/project-settings/integrations`}
              >
                Configure Now
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsVisible(false)}
                className="size-6 p-0 text-orange-600 hover:bg-orange-100"
              >
                <X className="size-4" />
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}
    </>
  );
};
export default ProjectConfigurationAlert;
