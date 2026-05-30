export type LocaleUnionTypes = "el" | "en" | "ru";

export type Suits = "spades" | "hearts" | "diamonds" | "clubs";
export interface GameConfig {
	id: string;
	locale: LocaleUnionTypes;
	teams: Teams[];
	isTotska: boolean;
}

export interface GameState {
	points: Record<string, number>;
	gameProgress: "notStarted" | "inProgress" | "completed";
	round: number;
}

export interface RoundState extends GameState {
	bidedTeam: string;
	bidedSuit: Suits;
}

export type Teams = {
	fullName: string;
	shortName: string;
};

export type GameContextType = {
	config: GameConfig;
	setLanguage: (locale: LocaleUnionTypes) => void;
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
