"use client";

import {
	AudioWaveform,
	BadgeCheck,
	Bell,
	ChevronRight,
	ChevronsUpDown,
	Command,
	CreditCard,
	GalleryVerticalEnd,
	Home,
	LifeBuoy,
	LogOut,
	MoonIcon,
	Plus,
	Send,
	Settings,
	Sparkles,
	SunIcon,
	SunMoon,
	Tickets,
} from "lucide-react";
import * as React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { type Theme, useTheme } from "@/components/theme-provider";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
	SidebarInset,
	SidebarLogo,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
	SidebarProvider,
	SidebarRail,
} from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthProvider";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const data = {
	user: {
		name: "Shanto Islam",
		email: "ishanto@gmail.com",
		avatar: "https://avatars.githubusercontent.com/u/40614334?v=4",
	},
	teams: [
		{
			name: "Acme Inc",
			logo: GalleryVerticalEnd,
			plan: "Enterprise",
		},
		{
			name: "Acme Corp.",
			logo: AudioWaveform,
			plan: "Startup",
		},
		{
			name: "Evil Corp.",
			logo: Command,
			plan: "Free",
		},
	],
	navMain: [
		{
			title: "Dashboard",
			url: "/",
			icon: Home,
			isActive: true,
		},
		{
			title: "Tickets",
			url: "/tickets",
			icon: Tickets,
		},
		{
			title: "Settings",
			url: "/settings",
			icon: Settings,
			items: [
				{
					title: "General",
					url: "/settings",
				},
				{
					title: "Team",
					url: "/",
				},
				{
					title: "Billing",
					url: "/",
				},
				{
					title: "Limits",
					url: "/",
				},
			],
		},
	],
	navSecondary: [
		{
			title: "Support",
			url: "/",
			icon: LifeBuoy,
		},
		{
			title: "Feedback",
			url: "/",
			icon: Send,
		},
	],
};

export type DashBoardSidebarProps = {
	children: React.ReactNode;
};
export default function DashBoardSidebar(props: DashBoardSidebarProps) {
	const [activeTeam, setActiveTeam] = React.useState(data.teams[0]);

	const { theme, setTheme } = useTheme();
	const handleThemeSelect = (theme: Theme) => {
		setTheme(theme);
	};

	const { logout } = useAuth();

	return (
		<SidebarProvider>
			<Sidebar collapsible="icon" variant="sidebar">
				<SidebarHeader>
					<SidebarLogo
						logo={{
							dark: {
								url: "/t2-site-brand-dark.svg",
								mobileUrl: "/t2-site-icon-dark.svg",
							},
							light: {
								url: "/t2-site-brand-light.svg",
								mobileUrl: "/t2-site-icon-light.svg",
							},
						}}
					/>
					<SidebarMenu>
						<SidebarMenuItem>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<SidebarMenuButton
										size="lg"
										className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
									>
										<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-black text-white dark:bg-black dark:text-white">
											<activeTeam.logo className="size-4" />
										</div>
										<div className="grid flex-1 text-left text-sm leading-tight">
											<span className="truncate font-semibold">
												{activeTeam.name}
											</span>
											<span className="truncate text-xs">
												{activeTeam.plan}
											</span>
										</div>
										<ChevronsUpDown className="ml-auto" />
									</SidebarMenuButton>
								</DropdownMenuTrigger>
								<DropdownMenuContent
									className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
									align="start"
									side="bottom"
									sideOffset={4}
								>
									<DropdownMenuLabel className="text-xs text-muted-foreground">
										Teams
									</DropdownMenuLabel>
									{data.teams.map((team, index) => (
										<DropdownMenuItem
											key={team.name}
											onClick={() => setActiveTeam(team)}
											className="gap-2 p-2"
										>
											<div className="flex size-6 items-center justify-center rounded-sm border">
												<team.logo className="size-4 shrink-0" />
											</div>
											{team.name}
											<DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
										</DropdownMenuItem>
									))}
									<DropdownMenuSeparator />
									<DropdownMenuItem className="gap-2 p-2">
										<div className="flex size-6 items-center justify-center rounded-md border bg-background">
											<Plus className="size-4" />
										</div>
										<div className="font-medium text-muted-foreground">
											Add team
										</div>
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarHeader>
				<SidebarContent>
					<SidebarGroup>
						<SidebarMenu>
							{data.navMain.map((item) => (
								<Collapsible
									key={item.title}
									asChild
									defaultOpen={item.isActive}
									className="group/collapsible"
								>
									<SidebarMenuItem>
										<CollapsibleTrigger asChild>
											<SidebarMenuButton asChild tooltip={item.title}>
												{!item.items?.length ? (
													<Link to={item.url}>
														{item.icon && <item.icon />}
														<span>{item.title}</span>
													</Link>
												) : (
													<span>
														{item.icon && <item.icon />}
														<span>{item.title}</span>
														<ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
													</span>
												)}
											</SidebarMenuButton>
										</CollapsibleTrigger>
										{item.items?.length && (
											<CollapsibleContent>
												<SidebarMenuSub>
													{item.items?.map((subItem) => (
														<SidebarMenuSubItem key={subItem.title}>
															<SidebarMenuSubButton asChild>
																<Link to={subItem.url}>
																	<span>{subItem.title}</span>
																</Link>
															</SidebarMenuSubButton>
														</SidebarMenuSubItem>
													))}
												</SidebarMenuSub>
											</CollapsibleContent>
										)}
									</SidebarMenuItem>
								</Collapsible>
							))}
						</SidebarMenu>
					</SidebarGroup>
					<SidebarGroup className="mt-auto">
						<SidebarGroupContent>
							<SidebarMenu>
								{data.navSecondary.map((item) => (
									<SidebarMenuItem key={item.title}>
										<SidebarMenuButton asChild size="sm">
											<a href={item.url}>
												<item.icon />
												<span>{item.title}</span>
											</a>
										</SidebarMenuButton>
									</SidebarMenuItem>
								))}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				</SidebarContent>
				<SidebarFooter>
					<SidebarMenu>
						<SidebarMenuItem>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<SidebarMenuButton
										size="lg"
										className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
									>
										<Avatar className="h-8 w-8 rounded-lg">
											<AvatarImage
												src={data.user.avatar}
												alt={data.user.name}
											/>
											<AvatarFallback className="rounded-lg">CN</AvatarFallback>
										</Avatar>
										<div className="grid flex-1 text-left text-sm leading-tight">
											<span className="truncate font-semibold">
												{data.user.name}
											</span>
											<span className="truncate text-xs">
												{data.user.email}
											</span>
										</div>
										<ChevronsUpDown className="ml-auto size-4" />
									</SidebarMenuButton>
								</DropdownMenuTrigger>
								<DropdownMenuContent
									className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
									side="bottom"
									align="end"
									sideOffset={4}
								>
									<DropdownMenuLabel className="p-0 font-normal">
										<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
											<Avatar className="h-8 w-8 rounded-lg">
												<AvatarImage
													src={data.user.avatar}
													alt={data.user.name}
												/>
												<AvatarFallback className="rounded-lg">
													SI
												</AvatarFallback>
											</Avatar>
											<div className="grid flex-1 text-left text-sm leading-tight">
												<span className="truncate font-semibold">
													{data.user.name}
												</span>
												<span className="truncate text-xs">
													{data.user.email}
												</span>
											</div>
										</div>
									</DropdownMenuLabel>
									<DropdownMenuSeparator />
									<DropdownMenuGroup>
										<DropdownMenuItem>
											<Sparkles />
											Upgrade to Pro
										</DropdownMenuItem>
									</DropdownMenuGroup>
									<DropdownMenuSeparator />
									<DropdownMenuGroup>
										<DropdownMenuItem>
											<BadgeCheck />
											Account
										</DropdownMenuItem>
										<DropdownMenuItem>
											<CreditCard />
											Billing
										</DropdownMenuItem>
										<DropdownMenuItem>
											<Bell />
											Notifications
										</DropdownMenuItem>
									</DropdownMenuGroup>
									<DropdownMenuSeparator />
									<DropdownMenuSub>
										<DropdownMenuSubTrigger className="p-0 pr-1">
											<DropdownMenuItem>
												{theme === "light" && <SunIcon />}
												{theme === "dark" && <MoonIcon />}
												{theme === "system" && <SunMoon />}
												<span>Theme</span>
												<DropdownMenuShortcut className="font-sans capitalize tracking-tighter">
													{theme}
												</DropdownMenuShortcut>
											</DropdownMenuItem>
										</DropdownMenuSubTrigger>
										<DropdownMenuSubContent>
											<DropdownMenuItem
												onSelect={() => {
													handleThemeSelect("light");
												}}
												className={cn({
													"bg-muted": theme === "light",
												})}
											>
												<SunIcon /> Light
											</DropdownMenuItem>
											<DropdownMenuItem
												onSelect={() => {
													handleThemeSelect("dark");
												}}
												className={cn({
													"bg-muted": theme === "dark",
												})}
											>
												<MoonIcon /> Dark
											</DropdownMenuItem>

											<DropdownMenuItem
												onSelect={() => {
													handleThemeSelect("system");
												}}
												className={cn({
													"bg-muted": theme === "system",
												})}
											>
												<SunMoon /> System
											</DropdownMenuItem>
										</DropdownMenuSubContent>
									</DropdownMenuSub>
									<DropdownMenuItem
										onSelect={() => {
											logout();
										}}
									>
										<LogOut />
										Log out
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarFooter>
				<SidebarRail />
			</Sidebar>
			<SidebarInset>{props.children}</SidebarInset>
		</SidebarProvider>
	);
}
