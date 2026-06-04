import React from "react";
import {
	type GameConfig,
	type LocaleUnionTypes,
	type SectionPoints,
} from "../types";
import { GameContext } from "./GameStore";
import { useLocalStorageSync } from "../hooks/useLocalStorageSync";

const LS_GAME_CONFIG = "GameConfig";

const defaultConfig: GameConfig = {
	locale: "en",
	teams: [],
	isTotska: false,
	maxRoundPoints: 160,
};

export function GameStoreProvider({ children }: { children: React.ReactNode }) {
	const { state: gameConfig, setState: setGameConfig } =
		useLocalStorageSync<GameConfig>(LS_GAME_CONFIG, defaultConfig);

	const [bidedTeam, setBidedTeam] = React.useState("");
	const [bidedSuit, setBidedSuit] = React.useState("");

	const setLanguage = (locale: LocaleUnionTypes) => {
		setGameConfig((prev) => ({ ...prev, locale }));
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
				bidedTeam,
				setBidedTeam,
			}}
		>
			{children}
		</GameContext.Provider>
	);
}
