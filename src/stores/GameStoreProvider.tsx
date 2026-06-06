import React from "react";
import {
	type GameConfig,
	type LocaleUnionTypes,
	type SectionPoints,
	type Suit,
	type Team,
} from "../types";
import { GameContext } from "./GameStore";
import { useLocalStorageSync } from "../hooks/useLocalStorageSync";
import { useNavigate } from "react-router-dom";

const LS_GAME_CONFIG = "GameConfig";

const defaultConfig: GameConfig = {
	teams: [],
	isTotska: false,
	maxRoundPoints: 160,
	bidedTeam: "",
	bidedSuit: "spades",
	gameHistory: [],
};

export function GameStoreProvider({ children }: { children: React.ReactNode }) {
	const { state: gameConfig, setState: setGameConfig } =
		useLocalStorageSync<GameConfig>(LS_GAME_CONFIG, defaultConfig);
	const navigate = useNavigate();

	// getters
	const getTeamPointsByTeamShortName = (teamShortName: string) => {
		console.log(teamShortName);
		const teamObj = gameConfig.teams.find(
			(team) => team.shortName === teamShortName
		);
		console.log(teamObj?.score.roundPoints);
		return teamObj?.score.roundPoints;
	};

	// setters
	const setLanguage = (locale: LocaleUnionTypes) => {
		setGameConfig((prev) => ({ ...prev, locale }));
	};

	const setBidedSuit = (suit: Suit) => {
		setGameConfig((prev) => ({
			...prev,
			bidedSuit: suit,
		}));
	};

	const setBidedTeam = (bidedTeam: string) => {
		setGameConfig((prev) => ({
			...prev,
			bidedTeam: bidedTeam,
			teams: [
				...prev.teams.map((prevTeam: Team) => {
					if (prevTeam.shortName === bidedTeam) {
						return {
							...prevTeam,
							isRoundBided: true,
						};
					}
					return {
						...prevTeam,
						isRoundBided: false,
					};
				}),
			],
		}));
	};

	const setPointsByTeamShortName = (
		teamShortName: string,
		points: number,
		sectionPoints: SectionPoints,
		action: "add" | "minus"
	) => {
		setGameConfig((prev) => ({
			...prev,
			teams: [
				...prev.teams.map((prevTeam) => {
					if (prevTeam.shortName === teamShortName) {
						return {
							...prevTeam,
							score: {
								...prevTeam.score,
								[sectionPoints]:
									action === "add"
										? prevTeam.score[sectionPoints] + points
										: prevTeam.score[sectionPoints] - points,
							},
						};
					} else {
						return prevTeam;
					}
				}),
			],
		}));
	};

	const resetRound = () => {
		setGameConfig((prev) => ({
			...prev,
			bidedTeam: "",
			bidedSuit: "spades",
			maxRoundPoints: 0,
			teams: [
				...prev.teams.map((prevTeam) => ({
					...prevTeam,
					score: {
						...prevTeam.score,
						roundDeclarations: 0,
						roundPoints: 0,
						gamePoints: prevTeam.score.gamePoints + prevTeam.score.roundPoints,
					},
				})),
			],
		}));
	};

	const isMaxRoundPointsExceeded = (teams: Team[]) => {
		return teams.some((team) => team.score.gamePoints >= 1010);
	};

	const setSessionPoint = () => {
		const gameWinner = gameConfig.teams.reduce((best, team) =>
			team.score.gamePoints > best.score.gamePoints ? team : best
		);
		console.log(gameWinner);
		setGameConfig((prev) => ({
			...prev,
			teams: [
				...prev.teams.map((prevTeam) => {
					if (prevTeam.shortName === gameWinner.shortName) {
						return {
							...prevTeam,
							score: {
								...prevTeam.score,
								gamePoints: 0,
								sessionPoints: prevTeam.score.sessionPoints + 1,
							},
						};
					} else {
						return {
							...prevTeam,
							score: {
								...prevTeam.score,
								gamePoints: 0,
							},
						};
					}
				}),
			],
		}));
	};

	const nextRound = () => {
		let gameHistory = {};

		for (const team of gameConfig.teams) {
			gameHistory = {
				...gameHistory,
				[team.shortName]: team.score.roundPoints,
			};
		}

		setGameConfig((prev) => ({
			...prev,
			gameHistory: [...prev.gameHistory, gameHistory],
		}));

		resetRound();
		console.log(isMaxRoundPointsExceeded(gameConfig.teams));
		if (isMaxRoundPointsExceeded(gameConfig.teams)) setSessionPoint();

		navigate("/bid");
	};

	return (
		<GameContext.Provider
			value={{
				gameConfig,
				setGameConfig,
				setLanguage,
				setPointsByTeamShortName,
				setBidedSuit,
				setBidedTeam,
				getTeamPointsByTeamShortName,
				nextRound,
			}}
		>
			{children}
		</GameContext.Provider>
	);
}
