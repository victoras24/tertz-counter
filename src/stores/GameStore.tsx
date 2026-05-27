import React from "react";
import {
	type GameConfig,
	type GameContextType,
	type localeUnionTypes,
} from "../types";

const GameContext = React.createContext<GameContextType | undefined>(undefined);

const defaultConfigs: GameConfig = {
	id: "random",
	locale: "en",
	players: {
		you: {
			fullName: "",
			shortName: "",
		},
		partner: {
			fullName: "",
			shortName: "",
		},
		right: {
			fullName: "",
			shortName: "",
		},
		front: {
			fullName: "",
			shortName: "",
		},
	},
	isTotska: false,
	gameState: "notStarted",
};

export function GameStoreProvider({ children }: { children: React.ReactNode }) {
	const [config, setConfig] = React.useState<GameConfig>(defaultConfigs);

	const setLanguage = (locale: localeUnionTypes) => {
		setConfig((prev) => ({ ...prev, locale: locale }));
	};

	const setPlayersName = (playersName: GameConfig["players"]) =>
		setConfig((prev) => ({ ...prev, players: playersName }));

	const setIsTotska = (isTotska: boolean) =>
		setConfig((prev) => ({ ...prev, isTotska: isTotska }));

	const setGameState = (gameState: GameConfig["gameState"]) =>
		setConfig((prev) => ({ ...prev, gameState: gameState }));

	return (
		<GameContext.Provider
			value={{ config, setLanguage, setPlayersName, setIsTotska, setGameState }}
		>
			{children}
		</GameContext.Provider>
	);
}

// eslint-disable-next-line react-refresh/only-export-components
export const useGameStore = () => {
	const context = React.useContext(GameContext);

	if (!context) {
		throw new Error("useGameStore must be used within GameProvider");
	}

	return context;
};
