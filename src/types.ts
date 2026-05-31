export type LocaleUnionTypes = "el" | "en" | "ru";

export type Suits = "spades" | "hearts" | "diamonds" | "clubs";

export type PlayerId = "you" | "partner" | "front" | "right";

export interface GameConfig {
	locale: LocaleUnionTypes;
	teams: Team;
	isTotska: boolean;
}

export interface GameState {
	points: Record<string, number>;
	gameProgress: "notStarted" | "inProgress" | "completed";
}

export interface RoundState extends GameState {
	bidedTeam: string;
	bidedSuit: Suits;
}

export type Team = Record<string, number>;

export type Player = {
	id: PlayerId;
	fullName: string;
};

export type GameContextType = {
	gameConfig: GameConfig;
	setGameConfig: (configState: GameConfig) => void;
	setLanguage: (locale: LocaleUnionTypes) => void;
	nextRound: (gameState: GameState) => void;
	gameState: GameState;
	setGamePoints: (points: GameState["points"]) => void;
	setRoundPoints: (points: RoundState["points"]) => void;
	setPointsByTeamShortName: (teamShortName: string, points: number) => void;
	roundState: RoundState;
	bidedSuit: string;
	setBidedSuit: (suit: Suits) => void;
	bidedTeam: string;
	setBidedTeam: (team: string) => void;
};

export type Declarations = "tertz" | "palto" | "bella";

export type DeclarationConfig = {
	name: Declarations;
	points: number;
	useLimit: number;
}[];
