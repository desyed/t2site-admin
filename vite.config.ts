/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig, loadEnv } from "vite";



export default defineConfig(({ command: _c, mode }) => {

	const env = loadEnv(mode, process.cwd(), '');

	console.log('🚀 APP BACKEND URL', env.VITE_BACKEND_URL);

	return {
		plugins: [react()],
		build: {
			rollupOptions: {
				output: {
					manualChunks(id) {
						if (id.includes("node_modules")) {
							return id
								.toString()
								.split("node_modules/")[1]
								.split("/")[0]
								.toString();
						}
					},
				},
			},
		},
		resolve: {
			alias: {
				"@": path.resolve(__dirname, "./src"),
			},
		},
		server: {
			port: 5050,
			host: "0.0.0.0",
			proxy: {
				"/server": {
					target: env.VITE_BACKEND_URL,
					ws: true,
					changeOrigin: true,
					rewrite: (path) => path.replace(/^\/server/, ""),
				}
			},
		},
		preview: {
			port: 5050,
			host: "0.0.0.0",
			proxy: {
				"/server": {
					target: env.VITE_BACKEND_URL,
					ws: true,
					changeOrigin: true,
					rewrite: (path) => path.replace(/^\/server/, ""),
				}
			},
		},
	};
});
