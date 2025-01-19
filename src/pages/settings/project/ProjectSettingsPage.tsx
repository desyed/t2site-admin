import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Globe, Settings } from "lucide-react";
import { toast } from "sonner";

export async function loader() {
	// Fetch project data here
	return {
		projectName: "Default project",
		projectId: "116765",
		apiKey: "phc_tcd1QR16c87pDuuORrvvrVpuEn7unHwuLYitmUU5oYy",
		region: "US Cloud",
	};
}

export function Component() {
	const copyToClipboard = (text: string, message: string) => {
		navigator.clipboard.writeText(text);
		toast.success(message);
	};

	return (
		<div className="container mx-auto space-y-8">
			<div className="flex justify-between items-center">
				<h1 className="text-3xl font-bold">Project Settings</h1>
				<Button variant="outline" size="sm">
					<Settings className="mr-2 h-4 w-4" />
					Save Changes
				</Button>
			</div>

			<Tabs defaultValue="general" className="space-y-6">
				<TabsList>
					<TabsTrigger value="general">General</TabsTrigger>
					<TabsTrigger value="api">API & Integration</TabsTrigger>
				</TabsList>

				<TabsContent value="general">
					<Card>
						<CardHeader>
							<CardTitle>Project Information</CardTitle>
							<CardDescription>
								These settings only apply to the current project.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-6">
							<div className="space-y-2">
								<Label htmlFor="projectName">Display Name</Label>
								<Input id="projectName" defaultValue="Default project" />
							</div>
							
							<div className="space-y-2">
								<Label>Project Region</Label>
								<div className="flex items-center space-x-2">
									<Globe className="h-4 w-4 text-muted-foreground" />
									<span>US Cloud</span>
								</div>
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="api">
					<div className="grid gap-6">
						<Card>
							<CardHeader>
								<CardTitle>API Credentials</CardTitle>
								<CardDescription>
									Your API keys and project identifiers.
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-6">
								<div className="space-y-2">
									<Label>Project API Key</Label>
									<div className="flex space-x-2">
										<Input
											readOnly
											value="phc_tcd1QR16c87pDuuORrvvrVpuEn7unHwuLYitmUU5oYy"
										/>
										<Button
											variant="outline"
											size="icon"
											onClick={() => copyToClipboard(
												"phc_tcd1QR16c87pDuuORrvvrVpuEn7unHwuLYitmUU5oYy",
												"API key copied to clipboard!"
											)}
										>
											<Copy className="h-4 w-4" />
										</Button>
									</div>
									<p className="text-sm text-muted-foreground">
										Use this write-only key in your application.
									</p>
								</div>

								<div className="space-y-2">
									<Label>Project ID</Label>
									<div className="flex space-x-2">
										<Input readOnly value="116765" />
										<Button
											variant="outline"
											size="icon"
											onClick={() => copyToClipboard(
												"116765",
												"Project ID copied to clipboard!"
											)}
										>
											<Copy className="h-4 w-4" />
										</Button>
									</div>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Web Snippet</CardTitle>
								<CardDescription>
									PostHog's configurable web snippet allows you to autocapture events, record user sessions, and more.
								</CardDescription>
							</CardHeader>
							<CardContent className="grid">
								<pre className="bg-muted p-4 rounded-lg  overflow-y-hidden">
									<code>{`<script>
    !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
    posthog.init('phc_tcd1QR16c87pDuuORrvvrVpuEn7unHwuLYitmUU5oYy', {
        api_host: 'https://us.1.posthog.com',
        person_profiles: 'identified_only'  // or 'always' to create profiles for anonymous users as well
    })
</script>`}</code>
								</pre>
							</CardContent>
						</Card>
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
}
