import { useNavigate } from "react-router-dom";
import { declarations } from "../../../helper/configs";
import { useGameStore } from "../../../stores/GameStore";
import { Teams } from "../components/Teams";
import { Button } from "../../../components/button";
import React from "react";
import { DeclarationCard } from "../../../components/declaration-card";
import "./ExtraDeclarations.css";

export const ExtraDeclarations: React.FC = () => {
	const [useCounts, setUseCounts] = React.useState<Record<string, number>>(
		Object.fromEntries(declarations.map((d) => [d.name, 0]))
	);

	const { gameConfig, setBidedTeam, setPointsByTeamShortName, setGameConfig } =
		useGameStore();
	const navigate = useNavigate();

	return (
		<div className="container">
			<div className="header">
				<h1>DECLARATIONS</h1>
				<span className="tag-pill">
					Round {gameConfig.gameHistory.length + 1}
				</span>
			</div>
			<Teams
				config={gameConfig}
				setTeam={(bidedTeam) => setBidedTeam(bidedTeam)}
				setGameConfig={setGameConfig}
				selected={gameConfig.bidedTeam}
			/>

			{declarations.map((d) => (
				<DeclarationCard
					key={d.name}
					name={d.name}
					points={d.points}
					useLimit={d.useLimit}
					useCount={useCounts[d.name]}
					onClick={() => {
						setUseCounts((prev) => ({ ...prev, [d.name]: prev[d.name] + 1 }));
						setPointsByTeamShortName(
							gameConfig.bidedTeam,
							d.points,
							"roundPoints",
							"add"
						);
						setGameConfig((prev) => ({
							...prev,
							maxRoundPoints: prev.maxRoundPoints + d.points,
						}));
					}}
					onRemove={() => {
						if (useCounts[d.name] === 0) return;
						setUseCounts((prev) => ({ ...prev, [d.name]: prev[d.name] - 1 }));
						setPointsByTeamShortName(
							gameConfig.bidedTeam,
							d.points,
							"roundPoints",
							"minus"
						);
						setGameConfig((prev) => ({
							...prev,
							maxRoundPoints: prev.maxRoundPoints - d.points,
						}));
					}}
					icons={d.icons}
				/>
			))}
			<div className="spacer" />
			<Button
				label={"NEXT"}
				onClick={() => {
					navigate("/round-overview");
					setGameConfig((prev) => ({
						...prev,
						teams: [
							...prev.teams.map((prevTeam) => {
								if (prevTeam.shortName === gameConfig.bidedTeam) {
									return {
										...prevTeam,
										score: {
											...prevTeam.score,
											roundDeclarations: prev.maxRoundPoints - 160,
										},
									};
								} else {
									return prevTeam;
								}
							}),
						],
					}));
				}}
			/>
		</div>
	);
};
