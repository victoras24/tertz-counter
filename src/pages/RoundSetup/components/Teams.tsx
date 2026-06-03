import type { GameConfig, Team } from "../../../types";

interface TeamsProps {
	config: GameConfig;
	setTeam: React.Dispatch<React.SetStateAction<string>>;
	setGameConfig: React.Dispatch<React.SetStateAction<GameConfig>>;
}

export const Teams: React.FC<TeamsProps> = ({
	config,
	setTeam,
	setGameConfig,
}) => {
	return (
		<div>
			{config.teams.map((team: Team) => (
				<div key={team.shortName}>
					<p>{team.score.roundPoints}</p>
					<button
						key={team.shortName}
						onClick={() => {
							setGameConfig((prev) => ({
								...prev,
								maxRoundPoints: 160,
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
		</div>
	);
};
