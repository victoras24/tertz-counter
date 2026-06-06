import React from "react";
import { useGameStore } from "../../../stores/GameStore";
import { useNavigate } from "react-router-dom";
import { Teams } from "../components/Teams";
import type { Suit } from "../../../types";

const suitsArray: Suit[] = ["spades", "hearts", "diamonds", "clubs"];

export const BidedTeamAndSuit: React.FC = () => {
	const { gameConfig, setBidedSuit, setBidedTeam, setGameConfig } =
		useGameStore();
	const navigate = useNavigate();

	return (
		<div>
			<button onClick={() => navigate("/")}>Back button</button>
			<Teams
				config={gameConfig}
				setTeam={(bidedTeam) => {
					setBidedTeam(bidedTeam);
					navigate("/extra-declarations");
				}}
				setGameConfig={setGameConfig}
			/>
			{suitsArray.map((suit: Suit) => (
				<button key={suit} onClick={() => setBidedSuit(suit)}>
					{suit}
				</button>
			))}
		</div>
	);
};
