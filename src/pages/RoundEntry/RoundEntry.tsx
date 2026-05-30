import { useGameStore } from "../../stores/GameStore";
import styles from "./RoundEntry.module.css";
import { Declarations } from "./components/Declarations";
import { RoundEntryBidedSuit } from "./components/modals/RoundEntryBidedSuitModal";
import { RoundEntryBidedTeamModal } from "./components/modals/RoundEntryBidedTeamModal";
import { RoundEntryDeclarationsModal } from "./components/modals/RoundEntryDeclarationsModal";

export const RoundEntry: React.FC = () => {
	const { config, gameState, roundState } = useGameStore();
	console.log(gameState);

	const teamsScore = config.teams.map((team) => ({
		team,
		points: roundState.points?.[team.shortName] ?? 0,
	}));

	return (
		<div>
			<RoundEntryBidedTeamModal teams={config.teams} />
			<RoundEntryBidedSuit />
			<RoundEntryDeclarationsModal teamsScore={teamsScore} />
			<div>
				<h1>Round {gameState.round}</h1>
			</div>
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
