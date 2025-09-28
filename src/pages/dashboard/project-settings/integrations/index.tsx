import { PageHeader } from "@/components/dashboard/page-header";
import { delay } from "@/lib/utils";
import { createDashboardLoader } from "@/middlewares/auth-middleware";

export const loader = createDashboardLoader(async () => {
  return {
    title: 'Project Integrations Settings',
  };
});

export const Component = () => {
  return (  
     <>
      <PageHeader title="Integrations" />
      <div className='dashboard-container'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa quam sapiente vero reprehenderit molestias nihil, fugiat consequuntur illum dolor eius, numquam optio architecto porro voluptates in pariatur animi! Accusamus, et!
      </div>
    </> 
  );
}
