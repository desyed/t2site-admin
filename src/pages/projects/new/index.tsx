import CreateNewProject from './_components/create-new-project';

export async function loader() {
  return {
    projectName: 'Default project',
    projectId: '116765',
    apiKey: 'phc_tcd1QR16c87pDuuORrvvrVpuEn7unHwuLYitmUU5oYy',
    region: 'US Cloud',
  };
}

export function Component() {
  return (
    <div className="flex flex-1 flex-col ">
      <CreateNewProject />
    </div>
  );
}
