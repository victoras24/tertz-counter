import { useLocation, useNavigate } from "react-router-dom";
import "./floating-pill.css";

const STEPS = [
	{ path: "/", label: "Setup", icon: "ti-users" },
	{ path: "/bid", label: "Bid", icon: "ti-cards" },
	{ path: "/extra-declarations", label: "Declare", icon: "ti-sparkles" },
	{ path: "/round-overview", label: "Round", icon: "ti-chart-bar" },
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
							<i className={`ti ${step.icon} nav__icon`} aria-hidden="true" />
							<span className="nav__label">{step.label}</span>
						</button>
					);
				})}
			</div>
		</nav>
	);
};
