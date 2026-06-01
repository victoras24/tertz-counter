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
	gamePoints: number;
};

export type Player = {
	id: PlayerId;
	fullName: string;
};

export type GameContextType = {
	gameConfig: GameConfig;
	setGameConfig: React.Dispatch<React.SetStateAction<GameConfig>>;
	setLanguage: React.Dispatch<React.SetStateAction<LocaleUnionTypes>>;
	nextRound: (gameState: GameState) => void;
	gameState: GameState;
	setGamePoints: React.Dispatch<React.SetStateAction<GameState["points"]>>;
	setRoundPoints: React.Dispatch<React.SetStateAction<RoundState["points"]>>;
	setPointsByTeamShortName: (teamShortName: string, points: number) => void;
	roundState: RoundState;
	bidedSuit: string;
	setBidedSuit: React.Dispatch<React.SetStateAction<Suits>>;
	bidedTeam: string;
	setBidedTeam: React.Dispatch<React.SetStateAction<string>>;
};

export type Declarations = "tertz" | "palto" | "bella";

export type DeclarationConfig = {
	name: Declarations;
	points: number;
	useLimit: number;
}[];
