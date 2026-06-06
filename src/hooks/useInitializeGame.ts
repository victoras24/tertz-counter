import { getShortName } from "../helper/common";
import { useGameStore } from "../stores/GameStore";
import type { Player, GameConfig } from "../types";

export const useInitializeGame = () => {
	const { setGameConfig } = useGameStore();
	const initializeGame = (formData: FormData) => {
		const players: Player[] = [];
		formData.forEach((data: FormDataEntryValue, key: string) =>
			players.push({ id: key, fullName: String(data) })
		);

		if (players.length === 5) players.pop();

		const isTotska = formData.get("isTotska") === "on" ? true : false;

		const team1 =
			getShortName(players[0].fullName) + getShortName(players[1].fullName);
		const team2 =
			getShortName(players[2].fullName) + getShortName(players[3].fullName);

		const gameConfig: GameConfig = {
			teams: [
				{
					shortName: team1,
					isRoundBided: false,
					score: {
						sessionPoints: 0,
						gamePoints: 0,
						roundPoints: 0,
						roundDeclarations: 0,
					},
				},
				{
					shortName: team2,
					isRoundBided: false,
					score: {
						sessionPoints: 0,
						gamePoints: 0,
						roundPoints: 0,
						roundDeclarations: 0,
					},
				},
			],
			bidedTeam: "",
			bidedSuit: "spades",
			isTotska: isTotska,
			maxRoundPoints: 160,
			gameHistory: [],
		};

		setGameConfig(gameConfig);
	};
	return { initializeGame };
};
