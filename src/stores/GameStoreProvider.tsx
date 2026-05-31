import React from "react";
import {
	type GameConfig,
	type GameState,
	type LocaleUnionTypes,
	type RoundState,
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
	const { config, setConfig } = useInitialize(LS_GAME_CONFIG, defaultConfig);
	const { config: gameState, setConfig: setGameState } = useInitialize(
		LS_GAME_STATE,
		defaultConfig
	);
	const { config: roundState, setConfig: setRoundState } = useInitialize(
		LS_ROUND_STATE,
		defaultState
	);

	const setLanguage = (locale: LocaleUnionTypes) => {
		setConfig((prev) => ({ ...prev, locale: locale }));
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
			points: points,
		}));
	};

	const setRoundPoints = (points: RoundState["points"]) => {
		setRoundState((prev) => ({
			...prev,
			points: points,
		}));
	};

	const setPointsByTeamShortName = (teamShortName: string, points: number) => {
		setRoundState((prev) => ({
			...prev,
			points: {
				...prev.points,
				[teamShortName]: prev.points[teamShortName] + points,
			},
		}));
	};

	return (
		<GameContext.Provider
			value={{
				config,
				setConfig,
				setLanguage,
				nextRound,
				gameState,
				setGamePoints,
				setRoundPoints,
				setPointsByTeamShortName,
				roundState,
			}}
		>
			{children}
		</GameContext.Provider>
	);
}
