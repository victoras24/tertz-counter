import { useEffect, useState } from "react";
import { useGameStore } from "../../stores/GameStore";

export const RoundOverview: React.FC = () => {
	const { gameConfig, setPointsByTeamShortName, setGameConfig } =
		useGameStore();
	const [input, setInput] = useState<number>(0);

	useEffect(() => {
		setGameConfig((prev) => ({
			...prev,
			teams: [
				...prev.teams.map((prevTeam) => {
					return {
						...prevTeam,
						score: {
							...prevTeam.score,
							roundPoints: prevTeam.score.roundDeclarations,
						},
					};
				}),
			],
		}));
	}, [setGameConfig]);

	return (
		<div>
			{gameConfig.teams.map((team) => (
				<div key={team.shortName}>
					<label htmlFor={team.shortName}>{team.shortName}</label>
					<input
						type="number"
						onChange={(e) => {
							if (e.target.value === "") {
								setInput(0);
								setGameConfig((prev) => ({
									...prev,
									teams: [
										...prev.teams.map((prevTeam) => {
											return {
												...prevTeam,
												score: {
													...prevTeam.score,
													roundPoints: prevTeam.score.roundDeclarations,
												},
											};
										}),
									],
								}));
								return;
							}

							setPointsByTeamShortName(
								team.shortName,
								input + team.score.roundDeclarations,
								"roundPoints",
								"minus"
							);

							setPointsByTeamShortName(
								team.shortName,
								Number(e.target.value) + team.score.roundDeclarations,
								"roundPoints",
								"add"
							);

							setInput(Number(e.target.value));

							setGameConfig((prev) => ({
								...prev,
								teams: [
									...prev.teams.map((prevTeam) => {
										if (prevTeam.shortName !== team.shortName) {
											return {
												...prevTeam,
												score: {
													...prevTeam.score,
													roundPoints:
														prev.maxRoundPoints -
														Number(e.target.value) -
														team.score.roundDeclarations,
												},
											};
										} else {
											return prevTeam;
										}
									}),
								],
							}));
						}}
						name={team.shortName}
					/>
					<p>{team.score.roundPoints}</p>
				</div>
			))}
		</div>
	);
};
