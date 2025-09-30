import { PageHeader } from '@/components/dashboard/page-header';
import { createDashboardLoader } from '@/middlewares/auth-middleware';

export const loader = createDashboardLoader(() => {
  return {
    title: 'Project General Settings',
  };
});

export const Component = () => {
  return (
    <>
      <PageHeader title="General" />
      <div className="dashboard-container">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa quam
        sapiente vero reprehenderit molestias nihil, fugiat consequuntur illum
        dolor eius, numquam optio architecto porro voluptates in pariatur animi!
        Accusamus, et!
      </div>
    </>
  );
};
