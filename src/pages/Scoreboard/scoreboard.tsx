// pages/Scoreboard/Scoreboard.tsx
import { useGameStore } from "../../stores/GameStore";
import styles from "./Scoreboard.module.css";

export const Scoreboard: React.FC = () => {
	const { gameConfig } = useGameStore();
	const { teams, gameHistory } = gameConfig;

	const [team1, team2] = teams;

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h1>Scoreboard</h1>
				<span className={styles.tagPill}>{gameHistory.length} rounds</span>
			</div>

			<div className={styles.sessionCard}>
				<div className={styles.sessionCol}>
					<span className={`${styles.sessionName} ${styles.blue}`}>
						{team1?.shortName}
					</span>
					<span className={`${styles.sessionScore} ${styles.blue}`}>
						{team1?.score.sessionPoints}
					</span>
					<span className={styles.sessionLabel}>Games won</span>
				</div>
				<div className={styles.sessionDivider} />
				<div className={styles.sessionMiddle}>
					<span className={styles.sessionTitle}>SESSION</span>
					<span className={styles.sessionSub}>First to win a game</span>
				</div>
				<div className={styles.sessionDivider} />
				<div className={styles.sessionCol}>
					<span className={`${styles.sessionName} ${styles.red}`}>
						{team2?.shortName}
					</span>
					<span className={`${styles.sessionScore} ${styles.red}`}>
						{team2?.score.sessionPoints}
					</span>
					<span className={styles.sessionLabel}>Games won</span>
				</div>
			</div>

			<div className={styles.gameCard}>
				<div className={styles.gameHeader}>
					<span className={styles.sectionLabel}>Current game</span>
					<span className={styles.gameTarget}>First to 1010</span>
				</div>

				<div className={styles.gameScores}>
					<div className={styles.gameTeam}>
						<span className={`${styles.gameTeamName} ${styles.blue}`}>
							{team1?.shortName}
						</span>
						<span className={`${styles.gamePoints} ${styles.blue}`}>
							{team1?.score.gamePoints}
						</span>
					</div>
					<span className={styles.gameSep}>—</span>
					<div className={styles.gameTeam} style={{ alignItems: "flex-end" }}>
						<span className={`${styles.gameTeamName} ${styles.red}`}>
							{team2?.shortName}
						</span>
						<span className={`${styles.gamePoints} ${styles.red}`}>
							{team2?.score.gamePoints}
						</span>
					</div>
				</div>

				<div className={styles.progressSection}>
					<div className={styles.progressRow}>
						<span className={styles.progressLabel}>{team1?.shortName}</span>
						<div className={styles.progressTrack}>
							<div
								className={`${styles.progressFill} ${styles.progressBlue}`}
								style={{
									width: `${Math.min(
										((team1?.score.gamePoints ?? 0) / 1010) * 100,
										100
									)}%`,
								}}
							/>
						</div>
						<span className={styles.progressPct}>
							{Math.round(((team1?.score.gamePoints ?? 0) / 1010) * 100)}%
						</span>
					</div>
					<div className={styles.progressRow}>
						<span className={styles.progressLabel}>{team2?.shortName}</span>
						<div className={styles.progressTrack}>
							<div
								className={`${styles.progressFill} ${styles.progressRed}`}
								style={{
									width: `${Math.min(
										((team2?.score.gamePoints ?? 0) / 1010) * 100,
										100
									)}%`,
								}}
							/>
						</div>
						<span className={styles.progressPct}>
							{Math.round(((team2?.score.gamePoints ?? 0) / 1010) * 100)}%
						</span>
					</div>
				</div>
			</div>

			{gameHistory.length > 0 && (
				<div className={styles.historyCard}>
					<span className={styles.sectionLabel}>Round history</span>

					<div className={styles.historyHeader}>
						<span className={styles.historyRound}>#</span>
						<span className={`${styles.historyTeam} ${styles.blue}`}>
							{team1?.shortName}
						</span>
						<span className={`${styles.historyTeam} ${styles.red}`}>
							{team2?.shortName}
						</span>
						<span className={styles.historyWinner}>Winner</span>
					</div>

					<div className={styles.historyDivider} />

					{[...gameHistory].reverse().map((round, i) => {
						const t1pts = round[team1?.shortName ?? ""] ?? 0;
						const t2pts = round[team2?.shortName ?? ""] ?? 0;
						const winner =
							t1pts > t2pts
								? team1?.shortName
								: t2pts > t1pts
								? team2?.shortName
								: null;
						const roundNumber = gameHistory.length - i;

						return (
							<div key={i} className={styles.historyRow}>
								<span className={styles.historyRound}>{roundNumber}</span>
								<span
									className={`${styles.historyPts} ${
										t1pts > t2pts ? styles.blue : styles.muted
									}`}
								>
									{t1pts}
								</span>
								<span
									className={`${styles.historyPts} ${
										t2pts > t1pts ? styles.red : styles.muted
									}`}
								>
									{t2pts}
								</span>
								<span
									className={`${styles.historyWinnerName} ${
										winner === team1?.shortName
											? styles.blue
											: winner === team2?.shortName
											? styles.red
											: styles.muted
									}`}
								>
									{winner ?? "—"}
								</span>
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
};
