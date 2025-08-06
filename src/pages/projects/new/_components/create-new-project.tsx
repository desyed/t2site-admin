import { useProjectStore } from '@/app/project/project.store';
import { Card } from '@/components/ui/card';

import StepController from './step-controller';
import { StepProgress } from './step-progress';
import SetupCompleteStep from './steps/complete-project.step';
import CreateProjectStep from './steps/create-project.step';
import ProjectServicesStep from './steps/project-services.step';
import VerifyProjectStep from './steps/verify-project.step';

const steps = [
  CreateProjectStep,
  VerifyProjectStep,
  ProjectServicesStep,
  SetupCompleteStep,
];

export default function CreateNewProject() {
  const currentStep = useProjectStore((state) => state.currentStep);

  const CurrentStep = steps[currentStep] as any;

  return (
    <div className="mx-auto mt-10 w-full max-w-xl px-4 pb-10 max-md:mt-4 md:px-0">
      <div className="mb-12">
        <StepProgress />
      </div>
      <Card className=" w-full max-md:border-none md:p-8">
        <div className="min-h-[350px]">
          <CurrentStep />
        </div>
        <StepController />
      </Card>
    </div>
  );
}
