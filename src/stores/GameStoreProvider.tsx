import React from "react";
import {
	type GameConfig,
	type LocaleUnionTypes,
	type SectionPoints,
	type Team,
} from "../types";
import { GameContext } from "./GameStore";
import { useLocalStorageSync } from "../hooks/useLocalStorageSync";

const LS_GAME_CONFIG = "GameConfig";

const defaultConfig: GameConfig = {
	locale: "en",
	teams: [],
	isTotska: false,
	maxRoundPoints: 160,
	bidedTeam: "",
};

export function GameStoreProvider({ children }: { children: React.ReactNode }) {
	const { state: gameConfig, setState: setGameConfig } =
		useLocalStorageSync<GameConfig>(LS_GAME_CONFIG, defaultConfig);
	const [bidedSuit, setBidedSuit] = React.useState("");

	// getters
	const getTeamPointsByTeamShortName = (teamShortName: string) => {
		console.log(teamShortName);
		const teamObj = gameConfig.teams.find(
			(team) => team.shortName === teamShortName
		);
		console.log(teamObj?.score.roundPoints);
		return teamObj?.score.roundPoints;
	};

	// setters
	const setLanguage = (locale: LocaleUnionTypes) => {
		setGameConfig((prev) => ({ ...prev, locale }));
	};

	const setBidedTeam = (bidedTeam: string) => {
		setGameConfig((prev) => ({
			...prev,
			bidedTeam: bidedTeam,
			teams: [
				...prev.teams.map((prevTeam: Team) => {
					if (prevTeam.shortName === bidedTeam) {
						return {
							...prevTeam,
							isRoundBided: true,
						};
					}
					return {
						...prevTeam,
						isRoundBided: false,
					};
				}),
			],
		}));
	};

	const setPointsByTeamShortName = (
		teamShortName: string,
		points: number,
		sectionPoints: SectionPoints,
		action: "add" | "minus"
	) => {
		setGameConfig((prev) => ({
			...prev,
			teams: [
				...prev.teams.map((prevTeam) => {
					if (prevTeam.shortName === teamShortName) {
						return {
							...prevTeam,
							score: {
								...prevTeam.score,
								[sectionPoints]:
									action === "add"
										? prevTeam.score[sectionPoints] + points
										: prevTeam.score[sectionPoints] - points,
							},
						};
					} else {
						return prevTeam;
					}
				}),
			],
		}));
	};

	return (
		<GameContext.Provider
			value={{
				gameConfig,
				setGameConfig,
				setLanguage,
				setPointsByTeamShortName,
				bidedSuit,
				setBidedSuit,
				setBidedTeam,
				getTeamPointsByTeamShortName,
			}}
		>
			{children}
		</GameContext.Provider>
	);
}
