// components/round-team-card/RoundTeamCard.tsx
import type { Team } from "../types";
import styles from "./RoundTeamCard.module.css";
import type { CSSProperties } from "react";

interface RoundTeamCardProps {
	team: Team;
	index: number;
	labelStyle: CSSProperties | undefined;
	inputStyle: CSSProperties | undefined;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	disabled: boolean;
}

export const RoundTeamCard: React.FC<RoundTeamCardProps> = ({
	team,
	index,
	labelStyle,
	inputStyle,
	onChange,
	disabled,
}) => {
	return (
		<div
			className={`${styles.card} ${
				index === 0 ? styles.cardBlue : styles.cardRed
			} ${disabled ? styles.cardDisabled : ""}`}
		>
			<div className={styles.header}>
				<label
					htmlFor={team.shortName}
					className={`${styles.teamName} ${
						index === 0 ? styles.teamNameBlue : styles.teamNameRed
					}`}
					style={labelStyle}
				>
					{team.shortName}
				</label>
				{team.isRoundBided && <span className={styles.bidBadge}>Bidder</span>}
			</div>

			<div className={styles.row}>
				<div className={styles.inputWrap}>
					<span className={styles.sublabel}>Cards collected</span>
					<input
						id={team.shortName}
						name={team.shortName}
						type="number"
						className={styles.input}
						style={inputStyle}
						onChange={onChange}
						placeholder="0"
						disabled={disabled}
					/>
				</div>

				<div className={styles.scoreWrap}>
					<span className={styles.sublabel}>Round total</span>
					<span
						className={`${styles.score} ${
							index === 0 ? styles.scoreBlue : styles.scoreRed
						}`}
					>
						{team.score.roundPoints}
					</span>
				</div>
			</div>

			{team.score.roundDeclarations > 0 && (
				<div className={styles.declarations}>
					<span className={styles.declLabel}>Declarations</span>
					<span className={styles.declValue}>
						+{team.score.roundDeclarations}
					</span>
				</div>
			)}
		</div>
	);
};
