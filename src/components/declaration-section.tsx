import styles from "./DeclarationSection.module.css";
import { DeclarationCounter } from "./declaration-counter";
import { BellaToggle } from "./bella-toggle";

interface DeclarationSectionProps {
	label: string;
	tertz: number;
	palto: number;
	bella: boolean;
	onTertzChange: (v: number) => void;
	onPaltoChange: (v: number) => void;
	onBellaChange: (v: boolean) => void;
}

export const DeclarationSection: React.FC<DeclarationSectionProps> = ({
	label,
	tertz,
	palto,
	bella,
	onTertzChange,
	onPaltoChange,
	onBellaChange,
}) => {
	return (
		<div className={styles.section}>
			<p className={styles.label}>{label}</p>
			<div className={styles.cards}>
				<DeclarationCounter
					label="Tertz"
					points={20}
					value={tertz}
					onChange={onTertzChange}
				/>
				<DeclarationCounter
					label="Palto"
					points={50}
					value={palto}
					onChange={onPaltoChange}
				/>
				<BellaToggle value={bella} onChange={onBellaChange} />
			</div>
		</div>
	);
};
