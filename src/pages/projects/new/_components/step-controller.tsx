import { ArrowLeft, ArrowRight, ChevronRight } from 'lucide-react';
import { Link } from 'react-router';

import { useProjectStore } from '@/app/project/project.store';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function StepController() {
  const currentStep = useProjectStore((state) => state.currentStep);
  const getCurrentStep = useProjectStore((state) => state.getCurrentStep());
  const setCurrentStep = useProjectStore((state) => state.setCurrentStep);

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
          <Button variant="outline">
            <ArrowRight className="size-4" />
            Skip
          </Button>
        )}
        {getCurrentStep.continue && (
          <Button
            onClick={
              getCurrentStep.continueHandler ??
              (() => {
                setCurrentStep(currentStep + 1);
              })
            }
          >
            {getCurrentStep.continueLabel ?? 'Continue'}
            <ChevronRight className="ml-2 size-4" />
          </Button>
        )}
        {getCurrentStep.completed && (
          <>
            <Link to="/projects">
              <Button variant="outline">
                <ArrowLeft className="size-4" />
                Back to projects
              </Button>
            </Link>
            <Button>Go to dashboard</Button>
          </>
        )}
      </div>
    </div>
  );
}
