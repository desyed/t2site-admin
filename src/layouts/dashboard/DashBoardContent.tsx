import DashBoardHeader from './DashBoardHeader';

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
      <div className="mt-12">{props.children}</div>
    </>
  );
}
