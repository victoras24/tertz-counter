import styles from "./DeclarationCounter.module.css";

interface DeclarationCounterProps {
	label: string;
	points: number;
	value: number;
	onChange: (value: number) => void;
}

export const DeclarationCounter: React.FC<DeclarationCounterProps> = ({
	label,
	points,
	value,
	onChange,
}) => {
	return (
		<div className={styles.card}>
			<div className={styles.info}>
				<span className={styles.label}>{label}</span>
				<span className={styles.points}>+{points} pts each</span>
			</div>
			<div className={styles.counter}>
				<button
					type="button"
					className={styles.btn}
					onClick={() => onChange(Math.max(0, value - 1))}
					disabled={value === 0}
					aria-label={`Decrease ${label}`}
				>
					−
				</button>
				<span className={styles.value}>{value}</span>
				<button
					type="button"
					className={styles.btn}
					onClick={() => onChange(value + 1)}
					aria-label={`Increase ${label}`}
				>
					+
				</button>
			</div>
		</div>
	);
};
