import { useGameStore } from "../../stores/GameStore";
import styles from "./RoundEntry.module.css";
import { declarations } from "../../helper/configs";

export const RoundEntry: React.FC = () => {
	const { config, gameState, setPointsByTeamShortName, roundState } =
		useGameStore();
	console.log(gameState);

	const score = config.teams.map((team) => ({
		team,
		points: roundState.points?.[team.shortName] ?? 0,
	}));

	return (
		<div>
			<div>
				<h1>Round {gameState.round}</h1>
			</div>
			<div className={styles["round-info"]}>
				{score.map((e) => (
					<div key={e.team.shortName}>
						<h5>{e.team.shortName}</h5>
						<h2>{e.points}</h2>
					</div>
				))}
			</div>
			<div className={styles["round-info"]}>
				{score.map((e) => (
					<div>
						<input placeholder={e.team.shortName} name={e.team.shortName} />
					</div>
				))}
			</div>
			<div className={styles["declarations-container"]}>
				{declarations.map((d) => (
					<div className={styles["declaration"]}>
						<button className={styles["declaration-name"]}>{d.name}</button>
						<div>
							{score.map((e) => (
								<div className={styles["declaration-team-name-container"]}>
									<button
										className={styles["declaration-team-name"]}
										onClick={() =>
											setPointsByTeamShortName(e.team.shortName, d.points)
										}
									>
										{e.team.shortName}
									</button>
								</div>
							))}
						</div>
					</div>
				))}
			</div>
			<button>Next round</button>
		</div>
	);
};
