import React from "react";
import {
	type GameConfig,
	type GameState,
	type LocaleUnionTypes,
	type RoundState,
	type SectionPoints,
	type Suits,
} from "../types";
import { GameContext } from "./GameStore";
import { useInitialize } from "../hooks/useInitialization";

const LS_GAME_CONFIG = "GameConfig";
const LS_GAME_STATE = "GameState";
const LS_ROUND_STATE = "RoundState";

const defaultConfig: GameConfig = {
	locale: "en",
	teams: [],
	isTotska: false,
};

const defaultState: GameState = {
	points: {},
	gameProgress: "notStarted",
};

export function GameStoreProvider({ children }: { children: React.ReactNode }) {
	const { state: gameConfig, setState: setGameConfig } =
		useInitialize<GameConfig>(LS_GAME_CONFIG, defaultConfig);

	const { state: gameState, setState: setGameState } = useInitialize<GameState>(
		LS_GAME_STATE,
		defaultState
	);

	const { state: roundState, setState: setRoundState } =
		useInitialize<RoundState>(LS_ROUND_STATE, {} as RoundState);

	const [bidedTeam, setBidedTeam] = React.useState("");
	const [bidedSuit, setBidedSuit] = React.useState<Suits | "">("");

	const setLanguage = (locale: LocaleUnionTypes) => {
		setGameConfig((prev) => ({ ...prev, locale }));
	};

	const nextRound = (gameState: GameState) => {
		setGameState((prev) => ({
			...prev,
			points: gameState.points,
			gameProgress: gameState.gameProgress,
		}));
	};

	const setGamePoints = (points: GameState["points"]) => {
		setGameState((prev) => ({
			...prev,
			points,
		}));
	};

	const setRoundPoints = (points: RoundState["points"]) => {
		setRoundState((prev) => ({
			...prev,
			points,
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
				nextRound,
				gameState,
				setGamePoints,
				setRoundPoints,
				setPointsByTeamShortName,
				roundState,
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
