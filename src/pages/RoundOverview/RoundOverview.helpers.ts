import type { CSSProperties } from "react";
import type { Team } from "../../types";

export const inputStyle = (
	isInputExceededMaxRoundPoints: boolean
): CSSProperties | undefined => {
	if (isInputExceededMaxRoundPoints)
		return {
			borderColor: "red",
		};
	return { borderColor: "black" };
};

export const teamStyle = (
	maxRoundPoints: number,
	team: Team
): CSSProperties | undefined => {
	if (team.isRoundBided && team.score.roundPoints < maxRoundPoints / 2) {
		return {
			color: "red",
		};
	}
	return { color: "black" };
};
