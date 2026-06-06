import React, { useEffect } from "react";
import { useGameStore } from "../../../stores/GameStore";
import { useNavigate } from "react-router-dom";
import { Teams } from "../components/Teams";
import type { Suit } from "../../../types";

const suitsArray: Suit[] = ["spades", "hearts", "diamonds", "clubs"];

export const BidedTeamAndSuit: React.FC = () => {
	const { gameConfig, setBidedSuit, setBidedTeam, setGameConfig } =
		useGameStore();
	const navigate = useNavigate();

	useEffect(() => {
		if (gameConfig.bidedSuit && gameConfig.bidedTeam !== "")
			navigate("/extra-declarations");
	}, [gameConfig.bidedSuit, gameConfig.bidedTeam, navigate]);

	return (
		<div>
			<Teams
				config={gameConfig}
				setTeam={(bidedTeam) => setBidedTeam(bidedTeam)}
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
