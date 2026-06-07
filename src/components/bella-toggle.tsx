import styles from "./BellaToggle.module.css";

interface BellaToggleProps {
	value: boolean;
	onChange: (value: boolean) => void;
}

export const BellaToggle: React.FC<BellaToggleProps> = ({
	value,
	onChange,
}) => {
	return (
		<div className={`${styles.card} ${value ? styles.cardOn : ""}`}>
			<div className={styles.info}>
				<span className={styles.label}>Bella ♛</span>
				<span className={styles.desc}>King + Queen of trump · +20 pts</span>
			</div>
			<button
				type="button"
				className={`${styles.track} ${value ? styles.trackOn : ""}`}
				onClick={() => onChange(!value)}
				aria-label="Toggle Bella"
				role="switch"
				aria-checked={value}
			>
				<div className={styles.thumb} />
			</button>
		</div>
	);
};
