// import { LogOut } from 'lucide-react';
import { redirect, useLoaderData } from 'react-router';

// import { useAuthStore } from '@/app/auth/auth.store';
import { preFetchProjects } from '@/app/project/project.prefetch';
import ErrorScreen from '@/components/ErrorScreen';
// import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
// import {
//   DropdownMenu,
//   DropdownMenuTrigger,
//   DropdownMenuContent,
//   DropdownMenuItem,
// } from '@/components/ui/dropdown-menu';
// import { useAuth } from '@/contexts/auth-provider';
import { handleApiErrorException } from '@/lib/utils';
import { createPrivateLoader } from '@/middlewares/auth-middleware';

// import Projects from './_components/Projects';

export const loader = createPrivateLoader(async () => {
  try {
    const projects = await preFetchProjects();
    if (projects.length === 0) {
      return redirect('/create-project');
    } else {
      const firstProject = projects[0];
      if (!firstProject) {
        return redirect('/create-project');
      }
      return redirect(`/${firstProject.id}`);
    }
  } catch (error) {
    handleApiErrorException(error, true);
    return {
      error,
    };
  }
});

export function Component() {
  const { error } = useLoaderData() as { error: unknown };

  return <ErrorScreen error={error} />;

  // return (
  //   <div>
  //     <div className="absolute right-5 top-5 z-20">
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <div className="flex size-11 cursor-pointer flex-col items-center justify-center">
  //             <Avatar
  //               className={cn('size-8 rounded-full border-2 border-gray-400')}
  //             >
  //               <AvatarImage src={user?.avatar ?? ''} alt={user?.name} />
  //               <AvatarFallback>{user?.name ?? ''}</AvatarFallback>
  //             </Avatar>
  //           </div>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent
  //           align="start"
  //           side="left"
  //           sideOffset={0}
  //           className="m-2 w-64 rounded-xl border bg-white p-4 shadow-lg"
  //         >
  //           <div className="mb-3 px-4 pt-2">
  //             <h4 className="font-semibold text-gray-900">{user?.name}</h4>
  //             <p className="text-sm text-gray-600">{user?.email}</p>
  //           </div>

  //           <DropdownMenuItem
  //             onSelect={() => logout()}
  //             className="flex cursor-pointer items-center gap-3 bg-red-50 px-4 py-2 text-red-600 hover:bg-red-100"
  //           >
  //             <LogOut className="size-4" />
  //             Log out
  //           </DropdownMenuItem>
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     </div>

  //     <div className="m-2 flex flex-1 flex-col py-12 md:m-6">
  //       <Projects />
  //     </div>
  //   </div>
  // );
}
