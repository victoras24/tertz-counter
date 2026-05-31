export type LocaleUnionTypes = "el" | "en" | "ru";

export type Suits = "spades" | "hearts" | "diamonds" | "clubs";

export type PlayerId = "you" | "partner" | "front" | "right";

export interface GameConfig {
	locale: LocaleUnionTypes;
	teams: Team[];
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

export type Team = {
	shortName: string;
	players: Player[];
	sessionPoints: number;
	gamePoints: number;
	roundPoints: number;
};

export type Player = {
	id: PlayerId;
	fullName: string;
	teamName: Team["shortName"];
};

export type GameContextType = {
	config: GameConfig;
	setConfig: (configState: GameConfig) => void;
	setLanguage: (locale: LocaleUnionTypes) => void;
	nextRound: (gameState: GameState) => void;
	gameState: GameState;
	setGamePoints: (points: GameState["points"]) => void;
	setRoundPoints: (points: RoundState["points"]) => void;
	setPointsByTeamShortName: (teamShortName: string, points: number) => void;
	roundState: RoundState;
	bidedSuit: string;
	setBidedSuit: (suit: Suits) => void;
	bidedTeam: Team["shortName"];
	setBidedTeam: (team: string) => void;
};

export type Declarations = "tertz" | "palto" | "bella";

export type DeclarationConfig = {
	name: Declarations;
	points: number;
	useLimit: number;
}[];
