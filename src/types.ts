export type localeUnionTypes = "el" | "en" | "ru";

export interface GameConfig {
	id: string;
	locale: localeUnionTypes;
	teams: Teams[];
	isTotska: boolean;
}

export interface GameState {
	points: Record<string, number>;
	gameProgress: "notStarted" | "inProgress" | "completed";
	round: number;
}

type Teams = {
	fullName: string;
	shortName: string;
};

export type GameContextType = {
	config: GameConfig;
	setLanguage: (locale: localeUnionTypes) => void;
	initializeGame: (formData: FormData) => void;
	nextRound: (gameState: GameState) => void;
	gameState: GameState;
	setPoints: (points: GameState["points"]) => void;
};
