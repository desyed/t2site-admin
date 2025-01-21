import "./styles/global.css";

// import { scan } from 'react-scan';

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";


// Scan is only enabled in development mode
// if (typeof window !== 'undefined' && import.meta.env.DEV) {
// 	scan({
// 		enabled: true,
// 		log: false,
// 		showToolbar: true,
// 		animationSpeed: "slow",
// 	});
// }

// biome-ignore lint/style/noNonNullAssertion: <explanation>
createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
