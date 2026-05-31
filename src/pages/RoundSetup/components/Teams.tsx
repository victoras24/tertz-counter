import type { GameConfig } from "../../../types";

interface TeamsProps {
	config: GameConfig;
	setTeam: (string: string) => void;
}

export const Teams: React.FC<TeamsProps> = ({ config, setTeam }) => {
	return (
		<>
			{Object.keys(config.teams).map((team) => (
				<button
					key={team}
					onClick={() => {
						setTeam(team);
					}}
				>
					{team}
				</button>
			))}
		</>
	);
};
