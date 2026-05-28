import React, { useEffect } from "react";
import {
	type GameConfig,
	type GameState,
	type localeUnionTypes,
} from "../types";
import { GameContext } from "./GameStore";
import { getShortName } from "../helper/common";

const LOCAL_STORAGE_CONFIG = "GameConfig";
const LOCAL_STORAGE_GAMESTATE = "GameState";

const defaultConfig: GameConfig = {
	id: "random",
	locale: "en",
	teams: [],
	isTotska: false,
};

const defaultState: GameState = {
	points: {},
	gameProgress: "notStarted",
	round: 1,
};

export function GameStoreProvider({ children }: { children: React.ReactNode }) {
	const [config, setConfig] = React.useState<GameConfig>(() => {
		const saved = localStorage.getItem(LOCAL_STORAGE_CONFIG);

		return saved ? JSON.parse(saved) : defaultConfig;
	});
	const [gameState, setGameState] = React.useState<GameState>(() => {
		const saved = localStorage.getItem(LOCAL_STORAGE_GAMESTATE);

		return saved ? JSON.parse(saved) : defaultState;
	});

	useEffect(() => {
		if (config !== defaultConfig)
			localStorage.setItem(LOCAL_STORAGE_CONFIG, JSON.stringify(config));
		if (gameState !== defaultState)
			localStorage.setItem(LOCAL_STORAGE_GAMESTATE, JSON.stringify(gameState));
	}, [config, gameState]);

	const setLanguage = (locale: localeUnionTypes) => {
		setConfig((prev) => ({ ...prev, locale: locale }));
	};

	const initializeGame = (formData: FormData) => {
		setConfig(
			(prev) =>
				({
					...prev,
					teams: [
						{
							fullName:
								String(formData.get("you")) +
								"&" +
								String(formData.get("partner")),
							shortName:
								getShortName(formData.get("you")) +
								getShortName(formData.get("partner")),
						},
						{
							fullName:
								String(formData.get("front")) +
								"&" +
								String(formData.get("right")),
							shortName:
								getShortName(formData.get("front")) +
								getShortName(formData.get("right")),
						},
					],
					isTotska: formData.get("isTotska") === "on",
				} satisfies GameConfig)
		);
	};

	const nextRound = (gameState: GameState) => {
		setGameState((prev) => ({
			...prev,
			points: gameState.points,
			round: gameState.round,
			gameProgress: gameState.gameProgress,
		}));
	};

	const setPoints = (points: GameState["points"]) => {
		setGameState((prev) => ({
			...prev,
			points: points,
		}));
	};

	return (
		<GameContext.Provider
			value={{
				config,
				setLanguage,
				initializeGame,
				nextRound,
				gameState,
				setPoints,
			}}
		>
			{children}
		</GameContext.Provider>
	);
}
