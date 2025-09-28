
import { createDashboardLoader } from "@/middlewares/auth-middleware";

export const loader = createDashboardLoader(() => {
  return {
    title: 'Project Team Members Settings',
  };
});

export const Component = () => {
  return (
    <div>
      <h1>Project Team Members Settings</h1>
    </div>
  );
}
