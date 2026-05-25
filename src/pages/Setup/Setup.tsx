import { useGameStore } from "../../stores/GameStore";
import styles from "./Setup.module.css";

export const Setup = () => {
	const { setPlayersName, setIsTotska, config } = useGameStore();
	console.log(config);
	const formAction = (formData: FormData) => {
		setPlayersName({
			you: String(formData.get("you")),
			partner: String(formData.get("partner")),
			front: String(formData.get("front")),
			right: String(formData.get("right")),
		});
	};

	return (
		<div className={styles.container}>
			<form action={formAction}>
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
