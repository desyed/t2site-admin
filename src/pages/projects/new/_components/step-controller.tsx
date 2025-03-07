import { ArrowLeft, ArrowRight, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';

import { useProjectStore } from '@/app/project/project.store';
import { Button as SiteButton } from '@/components/site-button';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function StepController() {
  const navigate = useNavigate();
  const currentNewProject = useProjectStore((state) => state.currentNewProject);
  const [continueLoading, setContinueLoading] = useState(false);

  const currentStep = useProjectStore((state) => state.currentStep);
  const getCurrentStep = useProjectStore((state) => state.getCurrentStep());
  const setCurrentStep = useProjectStore((state) => state.setCurrentStep);
  const resetProjectCreation = useProjectStore(
    (state) => state.resetProjectCreation
  );

  if (getCurrentStep.noController) {
    return null;
  }

  return (
    <div
      className={cn(
        'mt-9 flex justify-between gap-3',
        !getCurrentStep.back && 'justify-end'
      )}
    >
      {getCurrentStep.back && (
        <Button
          variant="outline"
          onClick={() => setCurrentStep(currentStep - 1)}
        >
          <ArrowLeft className="size-4" />
          Back
        </Button>
      )}
      <div className="flex gap-3">
        {getCurrentStep.skip && (
          <Button
            variant="outline"
            onClick={() => {
              setCurrentStep(currentStep + 1);
            }}
          >
            <ArrowRight className="size-4" />
            Skip
          </Button>
        )}
        {getCurrentStep.continue && (
          <SiteButton
            loading={continueLoading}
            onClick={async () => {
              if (getCurrentStep.continueHandler) {
                setContinueLoading(true);
                await getCurrentStep.continueHandler();
                setContinueLoading(false);
              } else {
                setCurrentStep(currentStep + 1);
              }
            }}
            icon={
              getCurrentStep.continueIcon ? (
                <getCurrentStep.continueIcon className="size-4" />
              ) : (
                <ChevronRight className="size-4" />
              )
            }
          >
            {getCurrentStep.continueLabel ?? 'Continue'}
          </SiteButton>
        )}
        {getCurrentStep.completed && (
          <>
            <Button
              variant="outline"
              onClick={() => {
                navigate('/projects');
                setTimeout(() => {
                  resetProjectCreation();
                }, 1000);
              }}
            >
              <ArrowLeft className="size-4" />
              Back to projects
            </Button>

            <Button
              onClick={() => {
                if (currentNewProject?.id) {
                  navigate(
                    `/projects/${currentNewProject?.id}?redirect_to=/dashboard`
                  );
                }
                setTimeout(() => {
                  resetProjectCreation();
                }, 1000);
              }}
            >
              <ArrowRight className="size-4" />
              Go to dashboard
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
