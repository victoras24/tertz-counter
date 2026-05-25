export type localeUnionTypes = "el" | "en" | "ru";

export interface GameConfig {
	id: string;
	locale: localeUnionTypes;
	players: {
		you: string;
		partner: string;
		front: string;
		right: string;
	};
	isTotska: boolean;
}

export type GameContextType = {
	config: GameConfig;
	setLanguage: (locale: localeUnionTypes) => void;
	setPlayersName: (players: GameConfig["players"]) => void;
	setIsTotska: (isTotska: boolean) => void;
};
