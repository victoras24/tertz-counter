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

export type RoundState = GameState;

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
	setGamePoints: (points: GameState["points"]) => void;
	setRoundPoints: (points: RoundState["points"]) => void;
	setPointsByTeamShortName: (teamShortName: string, points: number) => void;
	roundState: RoundState;
};

export type Declarations = "tertz" | "palto" | "bella";

export type DeclarationConfig = {
	name: Declarations;
	points: number;
	useLimit: number;
}[];
