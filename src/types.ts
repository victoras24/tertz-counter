export type localeUnionTypes = "el" | "en" | "ru";

export interface GameConfig {
	id: string;
	locale: localeUnionTypes;
	teams: Teams[];
	isTotska: boolean;
	gameState: "notStarted" | "inProgress" | "completed";
	round: number;
}

type Teams = {
	fullName: string;
	shortName: string;
	points: number;
};

export type GameContextType = {
	config: GameConfig;
	setLanguage: (locale: localeUnionTypes) => void;
	initializeGame: (formData: FormData) => void;
};
