import { useLocation, useNavigate } from "react-router-dom";
import "./floating-pill.css";
import {
	IconCards,
	IconSparkles,
	IconChartBar,
	IconReload,
} from "@tabler/icons-react";

const STEPS = [
	{ path: "/", label: "New Game", icon: <IconReload size={18} /> },
	{ path: "/bid", label: "Bid", icon: <IconCards size={18} /> },
	{
		path: "/extra-declarations",
		label: "Declare",
		icon: <IconSparkles size={18} />,
	},
	{ path: "/round-overview", label: "Round", icon: <IconChartBar size={18} /> },
];

export const FloatingPillNav = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const currentIndex = STEPS.findIndex((s) => s.path === location.pathname);

	return (
		<nav className="nav" aria-label="Game navigation">
			<div className="nav__pill">
				{STEPS.map((step, i) => {
					const isActive = i === currentIndex;
					const isDone = i < currentIndex;
					const isLocked = i > currentIndex;

					return (
						<button
							key={step.path}
							className={`nav__item ${
								isActive
									? "nav__item--active"
									: isDone
									? "nav__item--done"
									: "nav__item--locked"
							}`}
							onClick={() => isDone && navigate(step.path)}
							disabled={isLocked}
							aria-current={isActive ? "page" : undefined}
							aria-label={step.label}
						>
							<span className="ti ${step.icon} nav__icon">{step.icon}</span>
							<span className="nav__label">{step.label}</span>
						</button>
					);
				})}
			</div>
		</nav>
	);
};
