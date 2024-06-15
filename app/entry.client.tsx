import { RemixBrowser } from "@remix-run/react";
import { StrictMode, startTransition } from "react";
import React from "react";
import { hydrateRoot } from "react-dom/client";
const app = document.querySelector("#app");
if (!app) throw new Error("#app not found.");
startTransition(() => {
	hydrateRoot(
		app,
		<StrictMode>
			<RemixBrowser />
		</StrictMode>,
	);
});
