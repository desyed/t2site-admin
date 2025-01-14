import { SidebarProvider } from "@/components/ui/sidebar";
import DashBoardContent from '@/layouts/dashboard/DashBoardContent';
import DashBoardSidebar from '@/layouts/dashboard/DashBoardSidebard';
import { Outlet } from 'react-router';
import { useAuth } from "@/contexts/AuthProvider";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function PrivateLayout() {

	const {isAuthenticated} = useAuth();
	const navigate = useNavigate();

  useEffect(()=>{
		if(!isAuthenticated){
			navigate('/login')
		}
	},[isAuthenticated]);


  return (
    <SidebarProvider>
      <DashBoardSidebar>
        <DashBoardContent>
          <Outlet />
        </DashBoardContent>
      </DashBoardSidebar>
    </SidebarProvider>
  );
}
