import type { GameConfig, Team } from "../../../types";
import styles from "./Teams.module.css";

interface TeamsProps {
	config: GameConfig;
	selected: string;
	setTeam: (bidedTeam: string) => void;
	setGameConfig: React.Dispatch<React.SetStateAction<GameConfig>>;
}

export const Teams: React.FC<TeamsProps> = ({
	config,
	selected,
	setTeam,
	setGameConfig,
}) => {
	return (
		<div className={styles.teams}>
			{config.teams.map((team: Team, index: number) => (
				<div key={team.shortName} className={styles.team}>
					<p className={styles.score}>{team.score.roundPoints}</p>
					<button
						key={team.shortName}
						className={`${styles.btn} ${
							index === 0 ? styles.btnBlue : styles.btnRed
						} ${
							selected === team.shortName
								? styles.btnSelected
								: styles.btnUnselected
						}`}
						onClick={() => {
							setGameConfig((prev) => ({
								...prev,
								maxRoundPoints: 160,
								teams: [
									...prev.teams.map((prevTem: Team) => {
										return {
											...prevTem,
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
