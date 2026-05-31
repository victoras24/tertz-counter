import { useNavigate } from "react-router-dom";
import styles from "./GameSetup.module.css";
import { useGameStore } from "../../stores/GameStore";
import type { GameConfig, Player, PlayerId } from "../../types";
import { getShortName } from "../../helper/common";

export const GameSetup = () => {
	const navigate = useNavigate();
	const { setGameConfig } = useGameStore();

	const initializeGame = (formData: FormData) => {
		const players: Player[] = [];

		formData.forEach((data, key: PlayerId) =>
			players.push({ id: key, fullName: String(data) })
		);

		players.pop();

		const isTotska = formData.get("isTotska") === "on" ? true : false;

		const team1 =
			getShortName(players[0].fullName) + getShortName(players[1].fullName);
		const team2 =
			getShortName(players[2].fullName) + getShortName(players[3].fullName);

		const gameConfig: GameConfig = {
			teams: { [team1]: 0, [team2]: 0 },
			locale: "en",
			isTotska: isTotska,
		};
		console.log(gameConfig);
		setGameConfig(gameConfig);
	};

	return (
		<div className={styles.container}>
			<form
				action={(formData) => {
					initializeGame(formData);
					navigate("/bid");
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
