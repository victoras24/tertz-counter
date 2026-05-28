import { useEffect } from "react";
import { useGameStore } from "../../stores/GameStore";
import type { GameState } from "../../types";
import styles from "./RoundEntry.module.css";

export const RoundEntry: React.FC = () => {
	const { config, gameState, setPoints } = useGameStore();

	useEffect(() => {
		if (gameState.round === 1) {
			const points: GameState["points"] = config.teams.reduce<
				GameState["points"]
			>((acc, team) => {
				acc[team.shortName] = 0;
				return acc;
			}, {});

			setPoints(points);
		}
	}, [config.teams, gameState.round, setPoints]);

	const score = config.teams.map((team) => ({
		team,
		points: gameState.points?.[team.shortName] ?? 0,
	}));

	return (
		<div>
			<div>
				<h1>Round {gameState.round}</h1>
			</div>
			<div className={styles["round-info"]}>
				{score.map((e) => {
					return (
						<div>
							<h5>{e.team.shortName}</h5>
							<h2>{e.points}</h2>
						</div>
					);
				})}
			</div>
			<button>Add points</button>
		</div>
	);
};
