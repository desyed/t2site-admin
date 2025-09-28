
import { delay } from "@/lib/utils";
import { createDashboardLoader } from "@/middlewares/auth-middleware";

export const loader = createDashboardLoader(async () => {
  await delay(2000);
  return {
    title: 'Project Integrations Settings',
  };
});

export const Component = () => {
  return (
    <div>
      <h1>Project Integrations Settings</h1>
    </div>
  );
}
