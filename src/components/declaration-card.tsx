// components/declaration-card/DeclarationCard.tsx
import styles from "./declaration-card.module.css";

interface DeclarationCardProps {
	name: string;
	points: number;
	useLimit: number;
	useCount: number;
	onClick: () => void;
}

export const DeclarationCard: React.FC<DeclarationCardProps> = ({
	name,
	points,
	useLimit,
	useCount,
	onClick,
}) => {
	const isBella = name.toLowerCase() === "bella";
	const isDisabled = useCount >= useLimit;

	return (
		<button
			className={`${styles.card} ${isBella ? styles.cardBella : ""} ${
				isDisabled ? styles.cardDisabled : ""
			}`}
			onClick={onClick}
			disabled={isDisabled}
		>
			<div className={styles.info}>
				<span className={styles.name}>{name}</span>
				<span className={styles.pts}>+{points} pts</span>
			</div>
			<div className={styles.uses}>
				{Array.from({ length: useLimit }).map((_, i) => (
					<div
						key={i}
						className={`${styles.dot} ${i < useCount ? styles.dotFilled : ""}`}
					/>
				))}
			</div>
		</button>
	);
};
