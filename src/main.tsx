import "./styles/global.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./routes.tsx";

const rootElement = document.getElementById("root");
if (rootElement) {
	createRoot(rootElement).render(
		<StrictMode>
			<App />
		</StrictMode>,
	);
}
