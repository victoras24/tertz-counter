import React from "react";
import { useGameStore } from "../../stores/GameStore";
import type { Team } from "../../types";

export const usePointDeclarationInputChange = () => {
	const { setPointsByTeamShortName, setGameConfig } = useGameStore();
	const [input, setInput] = React.useState<number>(0);

	// reset inputs when game refresh
	React.useEffect(() => {
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

	const resetPoints = () => {
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
	};

	const handleCurrentTeamInputChange = (
		event: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
		team: Team
	) => {
		setPointsByTeamShortName(
			team.shortName,
			input + team.score.roundDeclarations,
			"roundPoints",
			"minus"
		);

		setPointsByTeamShortName(
			team.shortName,
			Number(event.target.value) + team.score.roundDeclarations,
			"roundPoints",
			"add"
		);
	};

	const handleOtherTeamInputChange = (
		event: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
		team: Team
	) => {
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
									Number(event.target.value) -
									team.score.roundDeclarations,
							},
						};
					} else {
						return prevTeam;
					}
				}),
			],
		}));
	};

	const handleChange = (
		event: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
		team: Team
	) => {
		if (event.target.value === "") {
			resetPoints();
			return;
		}

		handleCurrentTeamInputChange(event, team);

		setInput(Number(event.target.value));

		handleOtherTeamInputChange(event, team);
	};

	return { input, handleChange };
};
