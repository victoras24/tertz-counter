import { useGameStore } from "../../stores/GameStore";
import styles from "./RoundEntry.module.css";

export const RoundEntry: React.FC = () => {
	const { config } = useGameStore();
	console.log(config);
	return (
		<div>
			<div>
				<h1>Round {config.round}</h1>
			</div>
			<div className={styles["round-info"]}>
				{config.teams.map((team) => (
					<div>
						<h5>{team.shortName}</h5>
						<p>{team.points}</p>
					</div>
				))}
			</div>
		</div>
	);
};
