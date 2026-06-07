import { Outlet, useLocation } from "react-router-dom";
import { FloatingPillNav } from "./components/floating-pill";

const STEPS = [
	{ path: "/", label: "Setup", icon: "ti-users" },
	{ path: "/bid", label: "Bid", icon: "ti-cards" },
	{ path: "/extra-declarations", label: "Declare", icon: "ti-sparkles" },
	{ path: "/round-overview", label: "Round", icon: "ti-chart-bar" },
];

export function Layout() {
	const location = useLocation();

	const currentIndex = STEPS.findIndex((s) => s.path === location.pathname);

	return (
		<>
			<Outlet />

			{currentIndex > 0 && <FloatingPillNav />}
		</>
	);
}
