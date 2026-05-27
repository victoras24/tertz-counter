import React from "react";
import { type GameConfig, type localeUnionTypes } from "../types";
import { GameContext } from "./GameStore";
import { getShortName } from "../helper/common";

const defaultConfigs: GameConfig = {
	id: "random",
	locale: "en",
	players: {
		you: {
			fullName: "",
			shortName: "",
		},
		partner: {
			fullName: "",
			shortName: "",
		},
		right: {
			fullName: "",
			shortName: "",
		},
		front: {
			fullName: "",
			shortName: "",
		},
	},
	isTotska: false,
	gameState: "notStarted",
};

export function GameStoreProvider({ children }: { children: React.ReactNode }) {
	const [config, setConfig] = React.useState<GameConfig>(defaultConfigs);

	const setLanguage = (locale: localeUnionTypes) => {
		setConfig((prev) => ({ ...prev, locale: locale }));
	};

	const initializeGame = (formData: FormData) => {
		setConfig((prev) => ({
			...prev,
			players: {
				you: {
					fullName: String(formData.get("you")),
					shortName: getShortName(formData.get("you")),
				},
				partner: {
					fullName: String(formData.get("partner")),
					shortName: getShortName(formData.get("partner")),
				},
				front: {
					fullName: String(formData.get("front")),
					shortName: getShortName(formData.get("front")),
				},
				right: {
					fullName: String(formData.get("right")),
					shortName: getShortName(formData.get("right")),
				},
			},
			isTotska: Boolean(formData.get("isTotska")),
			gameState: "inProgress",
		}));
	};

	return (
		<GameContext.Provider
			value={{
				config,
				setLanguage,
				initializeGame,
			}}
		>
			{children}
		</GameContext.Provider>
	);
}
