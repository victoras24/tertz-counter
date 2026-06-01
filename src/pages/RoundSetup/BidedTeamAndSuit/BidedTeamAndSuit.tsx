import React, { useEffect } from "react";
import { useGameStore } from "../../../stores/GameStore";
import { useNavigate } from "react-router-dom";
import { Teams } from "../components/Teams";
import type { Suits } from "../../../types";

const suitsArray = ["spades", "hearts", "diamonds", "clubs"];

export const BidedTeamAndSuit: React.FC = () => {
	const {
		gameConfig,
		bidedSuit,
		bidedTeam,
		setBidedSuit,
		setBidedTeam,
		setGameConfig,
	} = useGameStore();
	const navigate = useNavigate();

	useEffect(() => {
		if (bidedSuit !== "" && bidedTeam !== "") navigate("/extra-declarations");
	}, [bidedTeam, bidedSuit, navigate]);

	return (
		<div>
			<Teams
				config={gameConfig}
				setTeam={setBidedTeam}
				setGameConfig={setGameConfig}
			/>
			{suitsArray.map((suit: Suits) => (
				<button key={suit} onClick={() => setBidedSuit(suit)}>
					{suit}
				</button>
			))}
		</div>
	);
};
