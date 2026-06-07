import { Button } from "../../components/button";
import { useGameStore } from "../../stores/GameStore";
import { inputStyle, teamStyle } from "./RoundOverview.helpers";
import { usePointDeclarationInputChange } from "./usePointDeclarationInputChange";

import styles from "./RoundOverview.module.css";
import { RoundTeamCard } from "../../components/round-team-card";
import { WarningsCard } from "../../components/warning-card";

export const RoundOverview: React.FC = () => {
	const { gameConfig, nextRound } = useGameStore();
	const { handleChange, validations, input, activeTeam } =
		usePointDeclarationInputChange();

	const warnings = [
		validations.isInputExceededMaxRoundPoints && {
			key: "exceeded",
			message: `Points cannot exceed ${gameConfig.maxRoundPoints}`,
		},
		validations.isTeamFailedBid && {
			key: "failed-bid",
			message: `${validations.failedTeamName} failed their bid — points go to opponents`,
		},
	].filter(Boolean) as { key: string; message: string }[];

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h1>ROUND {gameConfig.gameHistory.length + 1}</h1>
				<span className={styles.tagPill}>Overview</span>
			</div>

			<div className={styles.teams}>
				{gameConfig.teams.map((team, index) => (
					<RoundTeamCard
						key={team.shortName}
						team={team}
						index={index}
						labelStyle={teamStyle(gameConfig.maxRoundPoints, team, input)}
						inputStyle={inputStyle(validations.isInputExceededMaxRoundPoints)}
						onChange={(event) => handleChange(event, team)}
						disabled={activeTeam !== null && activeTeam !== team.shortName}
					/>
				))}
			</div>
			<WarningsCard warnings={warnings} />

			<div className={styles.spacer} />
			<Button label="NEXT ROUND" onClick={nextRound} />
		</div>
	);
};
