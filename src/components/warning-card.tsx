import styles from "./WarningsCard.module.css";

interface Warning {
	key: string;
	message: string;
}

interface WarningsCardProps {
	warnings: Warning[];
}

export const WarningsCard: React.FC<WarningsCardProps> = ({ warnings }) => {
	if (warnings.length === 0) return null;

	return (
		<div className={styles.card}>
			{warnings.map((w) => (
				<div key={w.key} className={styles.row}>
					<span className={styles.icon}>⚠</span>
					<span className={styles.message}>{w.message}</span>
				</div>
			))}
		</div>
	);
};
