import { useNavigate } from "react-router-dom";
import styles from "./Setup.module.css";
import { useGameStore } from "../../stores/GameStore";

export const Setup = () => {
	const navigate = useNavigate();
	const { initializeGame } = useGameStore();

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
