import styles from "./declaration-card.module.css";

interface DeclarationCardProps {
	name: string;
	points: number;
	useLimit: number;
	useCount: number;
	onClick: () => void;
	onRemove: () => void;
	icons: React.ForwardRefExoticComponent<React.RefAttributes<SVGSVGElement>>[];
}

export const DeclarationCard: React.FC<DeclarationCardProps> = ({
	name,
	points,
	useLimit,
	useCount,
	onClick,
	onRemove,
	icons,
}) => {
	const isBella = name.toLowerCase() === "bella";
	const isDisabled = useCount >= useLimit;

	return (
		<div className={styles.row}>
			<button
				className={`${styles.card} ${isBella ? styles.cardBella : ""} ${
					isDisabled ? styles.cardDisabled : ""
				}`}
				onClick={onClick}
				disabled={isDisabled}
			>
				<div className={styles.info}>
					<div className={styles.nameCard}>
						<span className={styles.name}>{name}</span>
						{icons.map((Icon, i) => (
							<Icon key={i} />
						))}
					</div>
					<span className={styles.pts}>+{points} pts</span>
				</div>
				<div className={styles.uses}>
					{Array.from({ length: useLimit }).map((_, i) => (
						<div
							key={i}
							className={`${styles.dot} ${
								i < useCount ? styles.dotFilled : ""
							}`}
						/>
					))}
				</div>
			</button>

			<button
				className={styles.removeBtn}
				onClick={onRemove}
				disabled={useCount === 0}
				aria-label={`Remove ${name}`}
			>
				−
			</button>
		</div>
	);
};
