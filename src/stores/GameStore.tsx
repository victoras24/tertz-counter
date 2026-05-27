import React from "react";
import type { GameContextType } from "../types";

export const GameContext = React.createContext<GameContextType | undefined>(
	undefined
);

export const useGameStore = () => {
	const context = React.useContext(GameContext);

	if (!context) {
		throw new Error("useGameStore must be used within GameProvider");
	}

	return context;
};
