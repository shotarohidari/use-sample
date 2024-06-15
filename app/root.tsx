import { Outlet, Scripts } from "@remix-run/react";
import React from "react";
export function HydrateFallback() {
	return (
		<>
			<p>Loading...</p>
			<Scripts />
		</>
	);
}

export default function Component() {
	return (
		<>
			<Outlet />
			<Scripts />
		</>
	);
}
