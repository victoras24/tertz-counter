import { useNavigate } from "react-router-dom";
import styles from "./GameSetup.module.css";
import { useInitializeGame } from "../../hooks/useInitializeGame";
import { Table } from "../../components/table";
import { TogglePill } from "../../components/toggle-pill";
import { Input } from "../../components/input";
import { Button } from "../../components/button";

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
					<span>YOUR TEAM</span>
					<Input
						id={"you"}
						type={"text"}
						color={"blue"}
						placeholder={"You"}
						maxLength={16}
					/>
					<Input
						id={"partner"}
						type={"text"}
						color={"blue"}
						placeholder={"Partner"}
						maxLength={16}
					/>
					<span>OPPONENTS</span>
					<Input
						id={"front"}
						type={"text"}
						color={"red"}
						placeholder={"Front"}
						maxLength={16}
					/>
					<Input
						id={"right"}
						type={"text"}
						color={"red"}
						placeholder={"Right"}
						maxLength={16}
					/>
					<TogglePill text="Totska" name="isTotska" />

					<div className={styles.spacer} />
					<Button label="Start Game" type="submit" />
				</div>
			</form>
		</div>
	);
};
