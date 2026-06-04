export type LocaleUnionTypes = "el" | "en" | "ru";

export type Suits = "spades" | "hearts" | "diamonds" | "clubs";

export interface GameConfig {
	locale: LocaleUnionTypes;
	teams: Team[];
	isTotska: boolean;
	maxRoundPoints: number;
	bidedTeam: string;
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
	score: Score;
	isRoundBided: boolean;
};

export type Score = {
	sessionPoints: number;
	gamePoints: number;
	roundPoints: number;
	roundDeclarations: number;
};

export type SectionPoints = keyof Score;

export type Player = {
	id: string;
	fullName: string;
};

export type GameContextType = {
	gameConfig: GameConfig;
	setGameConfig: React.Dispatch<React.SetStateAction<GameConfig>>;
	setLanguage: (locale: LocaleUnionTypes) => void;
	setPointsByTeamShortName: (
		teamShortName: string,
		points: number,
		sectionPoints: SectionPoints,
		action: "add" | "minus"
	) => void;
	bidedSuit: string;
	setBidedSuit: (bid: string) => void;
	setBidedTeam: (bidedTeam: string) => void;
	getTeamPointsByTeamShortName: (teamShortName: string) => number | undefined;
};

export type Declarations = "tertz" | "palto" | "bella";

export type DeclarationConfig = {
	name: Declarations;
	points: number;
	useLimit: number;
}[];
