import DashBoardHeader from './dashboard-header';

export type DashBoardContentProps = {
  children: React.ReactNode;
  header?: {
    breadcrumbItems?: object[];
  };
};

export default function DashBoardContent(props: DashBoardContentProps) {
  return (
    <>
      <DashBoardHeader />
      <div className="mt-12 flex min-h-0 min-w-0 flex-1 flex-col whitespace-normal">
        {props.children}
      </div>
    </>
  );
}
