import { useNavigate } from "react-router-dom";
import styles from "./GameSetup.module.css";
import { useInitializeGame } from "../../hooks/useInitializeGame";
import { Table } from "../../components/table";

export const GameSetup = () => {
	const navigate = useNavigate();
	const { initializeGame } = useInitializeGame();

	return (
		<div className={styles.container}>
			<Table />
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
