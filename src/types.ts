import type { JSX } from "react";

export type LocaleUnionTypes = "el" | "en" | "ru";

export interface GameConfig {
	teams: Team[];
	isTotska: boolean;
	maxRoundPoints: number;
	bidedTeam: string;
	bidedSuit: string;
	gameHistory: Record<string, number>[];
}

export interface GameState {
	points: Record<string, number>;
	gameProgress: "notStarted" | "inProgress" | "completed";
}

export interface RoundState extends GameState {
	bidedTeam: string;
	bidedSuit: string;
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
	setBidedSuit: (suit: string) => void;
	setBidedTeam: (bidedTeam: string) => void;
	getTeamPointsByTeamShortName: (teamShortName: string) => number | undefined;
	nextRound: () => void;
};

export type Declarations = "Tertz" | "Palto" | "Bella";

export type DeclarationConfig = {
	name: Declarations;
	points: number;
	useLimit: number;
	icon: JSX.Element[];
}[];
