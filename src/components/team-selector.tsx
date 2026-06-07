import type { Team } from "../types";
import "./team-selector.css";

interface TeamSelectorProps {
	teams: Team[];
	selected: string;
	onChange: (id: string) => void;
}

export const TeamSelector: React.FC<TeamSelectorProps> = ({
	teams,
	selected,
	onChange,
}) => {
	return (
		<div className="team-selector">
			{teams.map((team) => (
				<button
					key={team.shortName}
					type="button"
					className={`team-selector__card ${
						selected === team.shortName ? "team-selector__card--active" : ""
					}`}
					onClick={() => onChange(team.shortName)}
				>
					<span className="team-selector__name">{team.shortName}</span>
				</button>
			))}
		</div>
	);
};
