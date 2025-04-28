import { Code2 } from 'lucide-react';

import { createProjectScriptTag } from '@/app/project/project.service';
import { useProjectStore } from '@/app/project/project.store';
import Alert from '@/components/Alert';
import SiteCodeBlock from '@/components/site-code-block';
import { Card } from '@/components/ui/card';

export default function VerifyProjectStep() {
  const getCurrentNewProject = useProjectStore(
    (state) => state.getCurrentNewProject
  );

  const currentProject = getCurrentNewProject();

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Verify Your Site</h2>
        <p className="text-sm text-muted-foreground">
          Add our script to your website to enable our services
        </p>
      </div>

      <div className="space-y-6">
        <Card className="space-y-4 border-none ">
          <div className="flex items-start gap-3">
            <Code2 className="mt-1 size-5 text-primary" />
            <div className="space-y-1">
              <p className="font-medium">Add this script to your site</p>
              <p className="text-sm text-muted-foreground">
                Copy and paste this code just before the closing &lt;/head&gt;
                tag
              </p>
            </div>
          </div>
          <div className="relative">
            <SiteCodeBlock
              code={createProjectScriptTag(currentProject?.id as string)}
              language="html"
            />
          </div>
        </Card>

        <Alert
          type="info"
          title="Script Installation"
          message="The script is lightweight ({'<'}5KB) and won't affect your site's performance"
        />
      </div>
    </div>
  );
}
