import React from "react";
import { useGameStore } from "../../stores/GameStore";
import type { Team } from "../../types";
import type { Validations } from "./RoundOverview.types";

export const usePointDeclarationInputChange = () => {
	const { setPointsByTeamShortName, setGameConfig, gameConfig } =
		useGameStore();
	const [input, setInput] = React.useState<number>(0);
	const [validations, setValidations] = React.useState<Validations>({
		isInputExceededMaxRoundPoints: false,
	});

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

	const validationChecks = (
		event: React.ChangeEvent<HTMLInputElement, HTMLInputElement>
	) => {
		setValidations({
			isInputExceededMaxRoundPoints:
				Number(event.target.value) > gameConfig.maxRoundPoints,
		});
	};

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

		validationChecks(event);
	};

	return { input, validations, handleChange };
};
