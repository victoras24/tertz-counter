import { useNavigate } from "react-router-dom";
import { getShortName } from "../../helper/common";
import { useGameStore } from "../../stores/GameStore";
import styles from "./Setup.module.css";

export const Setup = () => {
	const navigate = useNavigate();
	const { setPlayersName, setIsTotska, setGameState, config } = useGameStore();
	if (config) console.log(config);

	const mapFormDataToPlayersNames = (formData: FormData) => {
		setPlayersName({
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
		});
	};

	return (
		<div className={styles.container}>
			<form
				action={(formData) => {
					mapFormDataToPlayersNames(formData);
					setGameState("inProgress");
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
						<input
							type="checkbox"
							name="isTotska"
							onChange={(event) => {
								setIsTotska(event.target.checked);
							}}
						/>
					</div>
					<button type="submit">Start</button>
				</div>
			</form>
		</div>
	);
};
