import { useGameStore } from "../../stores/GameStore";
import styles from "./RoundSetup.module.css";
import { Declarations } from "./components/Declarations";

export const RoundSetup: React.FC = () => {
	const { config, gameState, roundState } = useGameStore();
	console.log(gameState);

	const teamsScore = config.teams.map((team) => ({
		team,
		points: roundState.points?.[team.shortName] ?? 0,
	}));

	return (
		<div>
			<div className={styles["round-info"]}>
				{teamsScore.map((e) => (
					<div key={e.team.shortName}>
						<h5>{e.team.shortName}</h5>
						<h2>{e.points}</h2>
					</div>
				))}
			</div>

			<Declarations teamsScore={teamsScore} />
			<button>Next round</button>
		</div>
	);
};
