export type localeUnionTypes = "el" | "en" | "ru";

export interface GameConfig {
	id: string;
	locale: localeUnionTypes;
	players: {
		you: { fullName: string; shortName: string };
		partner: { fullName: string; shortName: string };
		front: { fullName: string; shortName: string };
		right: { fullName: string; shortName: string };
	};
	isTotska: boolean;
	gameState: "notStarted" | "inProgress" | "completed";
}

export type GameContextType = {
	config: GameConfig;
	setLanguage: (locale: localeUnionTypes) => void;
	setPlayersName: (players: GameConfig["players"]) => void;
	setIsTotska: (isTotska: boolean) => void;
	setGameState: (gameState: GameConfig["gameState"]) => void;
};
