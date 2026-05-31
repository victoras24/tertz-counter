import { useNavigate } from "react-router-dom";
import styles from "./GameSetup.module.css";
import { useGameStore } from "../../stores/GameStore";
import type { GameConfig, PlayerId } from "../../types";
import { getShortName } from "../../helper/common";

export const GameSetup = () => {
	const navigate = useNavigate();
	const { setConfig } = useGameStore();

	const initializeGame = (formData: FormData) => {
		const players = [];

		formData.forEach((data, key: PlayerId) =>
			players.push({ id: key, fullName: String(data), teamName: "" })
		);

		const locale = formData.get("isTotska") === "on" ? true : false;

		const gameConfig: GameConfig = {
			teams: [
				{
					shortName:
						getShortName(players[0].fullName) +
						getShortName(players[1].fullName),
					players: [players[0], players[1]],
					sessionPoints: 0,
					gamePoints: 0,
					roundPoints: 0,
				},
				{
					shortName:
						getShortName(players[2].fullName) +
						getShortName(players[3].fullName),
					players: [players[2], players[3]],
					sessionPoints: 0,
					gamePoints: 0,
					roundPoints: 0,
				},
			],
			locale: "en",
			isTotska: locale,
		};

		setConfig(gameConfig);
	};

	return (
		<div className={styles.container}>
			<form
				action={(formData) => {
					initializeGame(formData);
					navigate("/round");
				}}
			>
				<div className={styles.inputs}>
					<input name="you" placeholder="You" />
					<input name="partner" placeholder="Partner" />
					<input name="front" placeholder="Front" />
					<input name="right" placeholder="Right" />
					<div className={styles.checkbox}>
						<label htmlFor="isTotska">IsTotska: </label>
						<input type="checkbox" name="isTotska" />
					</div>
					<button type="submit">Start</button>
				</div>
			</form>
		</div>
	);
};
