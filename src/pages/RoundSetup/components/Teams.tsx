import type { GameConfig } from "../../../types";

interface TeamsProps {
	config: GameConfig;
	setTeam: (name: string) => void;
}

export const Teams: React.FC<TeamsProps> = ({ config, setTeam }) => {
	return (
		<>
			{config.teams.map((team) => (
				<button
					key={team.shortName}
					onClick={() => {
						setTeam(team.shortName);
					}}
				>
					{team.shortName}
				</button>
			))}
		</>
	);
};
