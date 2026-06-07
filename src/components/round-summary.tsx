import styles from "./RoundSummary.module.css";

interface RoundSummaryProps {
	teams: {
		shortName: string;
		isRoundBided: boolean;
		score: {
			roundPoints: number;
			roundDeclarations: number;
		};
	}[];
	bidedSuit: string;
	maxRoundPoints: number;
}

const SUIT_SYMBOLS: Record<string, string> = {
	hearts: "♥",
	diamonds: "♦",
	spades: "♠",
	clubs: "♣",
};

const SUIT_RED = ["hearts", "diamonds"];

export const RoundSummary: React.FC<RoundSummaryProps> = ({
	teams,
	bidedSuit,
	maxRoundPoints,
}) => {
	const suit = SUIT_SYMBOLS[bidedSuit] ?? bidedSuit;
	const isRed = SUIT_RED.includes(bidedSuit);

	return (
		<div className={styles.card}>
			<div className={styles.header}>
				<span className={styles.title}>Round Summary</span>
				<span
					className={`${styles.suit} ${
						isRed ? styles.suitRed : styles.suitBlack
					}`}
				>
					{suit}
				</span>
			</div>

			<div className={styles.divider} />

			{teams.map((team, index) => (
				<div key={team.shortName} className={styles.teamRow}>
					<div className={styles.teamLeft}>
						<span
							className={`${styles.teamName} ${
								index === 0 ? styles.blue : styles.red
							}`}
						>
							{team.shortName}
						</span>
						{team.isRoundBided && (
							<span className={styles.bidderTag}>Bidder</span>
						)}
					</div>

					<div className={styles.breakdown}>
						<div className={styles.breakdownRow}>
							<span className={styles.breakdownLabel}>Cards</span>
							<span className={styles.breakdownValue}>
								{team.score.roundPoints - team.score.roundDeclarations}
							</span>
						</div>
						{team.score.roundDeclarations > 0 && (
							<div className={styles.breakdownRow}>
								<span className={styles.breakdownLabel}>Declarations</span>
								<span className={styles.breakdownValueGold}>
									+{team.score.roundDeclarations}
								</span>
							</div>
						)}
						<div className={styles.divider} />
						<div className={styles.breakdownRow}>
							<span className={styles.breakdownLabel}>Total</span>
							<span
								className={`${styles.total} ${
									index === 0 ? styles.blue : styles.red
								}`}
							>
								{team.score.roundPoints}
							</span>
						</div>
					</div>
				</div>
			))}

			<div className={styles.divider} />

			<div className={styles.poolRow}>
				<span className={styles.poolLabel}>Points pool</span>
				<span className={styles.poolValue}>{maxRoundPoints}</span>
			</div>
		</div>
	);
};
