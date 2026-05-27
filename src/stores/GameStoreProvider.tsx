import React from "react";
import { type GameConfig, type localeUnionTypes } from "../types";
import { GameContext } from "./GameStore";
import { getShortName } from "../helper/common";

const defaultConfigs: GameConfig = {
	id: "random",
	locale: "en",
	teams: [],
	isTotska: false,
	gameState: "notStarted",
	round: 1,
};

export function GameStoreProvider({ children }: { children: React.ReactNode }) {
	const [config, setConfig] = React.useState<GameConfig>(defaultConfigs);

	const setLanguage = (locale: localeUnionTypes) => {
		setConfig((prev) => ({ ...prev, locale: locale }));
	};

	const initializeGame = (formData: FormData) => {
		setConfig(
			(prev) =>
				({
					...prev,
					teams: [
						{
							fullName:
								String(formData.get("you")) +
								"&" +
								String(formData.get("Partner")),
							shortName:
								getShortName(formData.get("you")) +
								getShortName(formData.get("partner")),
							points: 0,
						},
						{
							fullName:
								String(formData.get("front")) +
								"&" +
								String(formData.get("right")),
							shortName:
								getShortName(formData.get("front")) +
								getShortName(formData.get("right")),
							points: 0,
						},
					],
					isTotska: Boolean(formData.get("isTotska")),
					gameState: "inProgress",
				} satisfies GameConfig)
		);
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
