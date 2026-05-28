import React, { useEffect } from "react";
import { type GameConfig, type localeUnionTypes } from "../types";
import { GameContext } from "./GameStore";
import { getShortName } from "../helper/common";

const LOCAL_STORAGE_CONFIG_STRING = "GameConfig";

export function GameStoreProvider({ children }: { children: React.ReactNode }) {
	const [config, setConfig] = React.useState<GameConfig>(() => {
		const saved = localStorage.getItem(LOCAL_STORAGE_CONFIG_STRING);

		return saved ? JSON.parse(saved) : null;
	});

	useEffect(() => {
		if (config !== null)
			localStorage.setItem(LOCAL_STORAGE_CONFIG_STRING, JSON.stringify(config));
		console.log(config);
	}, [config]);

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
								String(formData.get("partner")),
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
					isTotska: formData.get("isTotska") === "on",
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
