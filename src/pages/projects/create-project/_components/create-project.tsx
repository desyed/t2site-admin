import { CreateProjectForm } from '@/components/projects/create-project-form';

const CreateProject = () => {
  return (
    <>
      <h3 className="text-center text-2xl font-semibold">Create Project</h3>
      <p className="mb-4 mt-2 text-center text-sm text-muted-foreground">
        Create a new project to get started
      </p>

      <CreateProjectForm />
    </>
  );
};
export default CreateProject;
