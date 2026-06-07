import React from "react";
import { useGameStore } from "../../../stores/GameStore";
import { Teams } from "../components/Teams";
import "./BidedTeamAndSuit.css";
import { SuitPicker } from "../../../components/suit-picker";
import { Button } from "../../../components/button";
import { useNavigate } from "react-router-dom";

export const BidedTeamAndSuit: React.FC = () => {
	const { gameConfig, setBidedSuit, setBidedTeam, setGameConfig } =
		useGameStore();
	const navigate = useNavigate();

	return (
		<div className="container">
			<div className="header">
				<h1>BIDDING</h1>
				<span className="tag-pill">
					Round {gameConfig.gameHistory.length + 1}
				</span>
			</div>
			<div className="component-container">
				<div>
					<p className="section-title">Who's bidding?</p>
					<Teams
						config={gameConfig}
						setTeam={(bidedTeam) => {
							setBidedTeam(bidedTeam);
						}}
						setGameConfig={setGameConfig}
						selected={gameConfig.bidedTeam}
					/>
				</div>
				<div>
					<p className="section-title">Choose suit</p>

					<SuitPicker selected={gameConfig.bidedSuit} onChange={setBidedSuit} />
				</div>
			</div>
			<div className="spacer" />
			<Button
				label="Next"
				type="submit"
				onClick={() => {
					if (gameConfig.bidedSuit !== "" && gameConfig.bidedTeam !== "") {
						navigate("/extra-declarations");
					}
				}}
			/>
		</div>
	);
};
