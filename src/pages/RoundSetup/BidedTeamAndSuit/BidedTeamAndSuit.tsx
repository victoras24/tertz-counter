import React, { useEffect } from "react";
import { useGameStore } from "../../../stores/GameStore";
import { useNavigate } from "react-router-dom";
import { Teams } from "../components/Teams";

const suitsArray = ["spades", "hearts", "diamonds", "clubs"];

export const BidedTeamAndSuit: React.FC = () => {
	const { gameConfig, bidedSuit, setBidedSuit, setBidedTeam, setGameConfig } =
		useGameStore();
	const navigate = useNavigate();

	useEffect(() => {
		if (bidedSuit !== "" && gameConfig.bidedTeam !== "")
			navigate("/extra-declarations");
	}, [gameConfig.bidedTeam, bidedSuit, navigate]);

	return (
		<div>
			<Teams
				config={gameConfig}
				setTeam={(bidedTeam) => setBidedTeam(bidedTeam)}
				setGameConfig={setGameConfig}
			/>
			{suitsArray.map((suit: string) => (
				<button key={suit} onClick={() => setBidedSuit(suit)}>
					{suit}
				</button>
			))}
		</div>
	);
};
