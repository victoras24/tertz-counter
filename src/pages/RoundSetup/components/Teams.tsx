import { useGameStore } from "../../../stores/GameStore";
import type { GameConfig, Team } from "../../../types";

interface TeamsProps {
	config: GameConfig;
	setTeam: (string: string) => void;
}

export const Teams: React.FC<TeamsProps> = ({ config, setTeam }) => {
	const { setGameConfig } = useGameStore();

	return (
		<>
			{config.teams.map((team: Team) => (
				<div>
					<button
						key={team.shortName}
						onClick={() => {
							setGameConfig((prev) => ({
								...prev,
								teams: [
									...prev.teams.map((prevTem) => {
										return {
											shortName: prevTem.shortName,
											score: { ...prevTem.score, roundPoints: 0 },
										};
									}),
								],
							}));
							setTeam(team.shortName);
						}}
					>
						{team.shortName}
					</button>
				</div>
			))}
		</>
	);
};
