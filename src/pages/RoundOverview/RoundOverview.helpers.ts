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
	team: Team,
	input: number
): CSSProperties | undefined => {
	if (
		input > 0 &&
		team.isRoundBided &&
		team.score.roundPoints < maxRoundPoints / 2
	) {
		return {
			color: "red",
		};
	}
	return { color: "black" };
};
