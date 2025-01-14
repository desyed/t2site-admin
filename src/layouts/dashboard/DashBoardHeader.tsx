import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useLocation } from  "react-router";

export default function DashBoardHeader() {
	const location = useLocation();
	const pathSegments = location.pathname.split("/").filter(Boolean);

	return (
		<header className="flex h-16 border-b shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
			<div className="flex items-center gap-2 px-4">
				<SidebarTrigger className="-ml-1" />
				<Separator orientation="vertical" className="mr-2 h-4" />
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem className="hidden md:block">
							<BreadcrumbLink href="#">
								{pathSegments.length > 0
									? pathSegments[0].charAt(0).toUpperCase() +
										pathSegments[0].slice(1)
									: "Dashboard"}
							</BreadcrumbLink>
						</BreadcrumbItem>
						{pathSegments.length > 1 && (
							<>
								<BreadcrumbSeparator className="hidden md:block" />
								<BreadcrumbItem>
									<BreadcrumbPage>
										{pathSegments[1].charAt(0).toUpperCase() +
											pathSegments[1].slice(1)}
									</BreadcrumbPage>
								</BreadcrumbItem>
							</>
						)}
					</BreadcrumbList>
				</Breadcrumb>
			</div>
		</header>
	);
}
