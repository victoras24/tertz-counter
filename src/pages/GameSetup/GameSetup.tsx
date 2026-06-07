import { useState } from "react";
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

	const [you, setYou] = useState("");
	const [partner, setPartner] = useState("");
	const [front, setFront] = useState("");
	const [right, setRight] = useState("");

	return (
		<div className={styles.container}>
			<Table you={you} partner={partner} front={front} right={right} />{" "}
			<form
				action={(formData) => {
					initializeGame(formData);
					navigate("/bid");
				}}
			>
				<div className={styles.inputs}>
					<span>YOUR TEAM</span>
					<Input
						id="you"
						type="text"
						color="blue"
						placeholder="You"
						maxLength={16}
						value={you}
						onChange={(e) => setYou(e.target.value)}
					/>
					<Input
						id="partner"
						type="text"
						color="blue"
						placeholder="Partner"
						maxLength={16}
						value={partner}
						onChange={(e) => setPartner(e.target.value)}
					/>
					<span>OPPONENTS</span>
					<Input
						id="front"
						type="text"
						color="red"
						placeholder="Opponent"
						maxLength={16}
						value={front}
						onChange={(e) => setFront(e.target.value)}
					/>
					<Input
						id="right"
						type="text"
						color="red"
						placeholder="Opponent"
						maxLength={16}
						value={right}
						onChange={(e) => setRight(e.target.value)}
					/>
					<TogglePill text="Totska" name="isTotska" />
					<div className={styles.spacer} />
					<Button label="Start Game" type="submit" />
				</div>
			</form>
		</div>
	);
};
