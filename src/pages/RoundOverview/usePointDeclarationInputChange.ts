import React from "react";
import { useGameStore } from "../../stores/GameStore";
import type { Team } from "../../types";

export const usePointDeclarationInputChange = () => {
	const { setPointsByTeamShortName, setGameConfig, gameConfig } =
		useGameStore();
	const [activeTeam, setActiveTeam] = React.useState<string | null>(null);
	const [input, setInput] = React.useState<number>(0);
	const [isInputExceededMaxRoundPoints, setIsInputExceededMaxRoundPoints] =
		React.useState(false);

	React.useEffect(() => {
		setGameConfig((prev) => ({
			...prev,
			teams: prev.teams.map((prevTeam) => ({
				...prevTeam,
				score: {
					...prevTeam.score,
					roundPoints: prevTeam.score.roundDeclarations,
				},
			})),
		}));
	}, [setGameConfig]);

	const resetPoints = () => {
		setInput(0);
		setIsInputExceededMaxRoundPoints(false);
		setGameConfig((prev) => ({
			...prev,
			teams: prev.teams.map((prevTeam) => ({
				...prevTeam,
				score: {
					...prevTeam.score,
					roundPoints: prevTeam.score.roundDeclarations,
				},
			})),
		}));
	};

	const handleCurrentTeamInputChange = (
		event: React.ChangeEvent<HTMLInputElement>,
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
		event: React.ChangeEvent<HTMLInputElement>,
		team: Team
	) => {
		setGameConfig((prev) => ({
			...prev,
			teams: prev.teams.map((prevTeam) => {
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
				}
				return prevTeam;
			}),
		}));
	};

	const handleChange = (
		event: React.ChangeEvent<HTMLInputElement>,
		team: Team
	) => {
		if (event.target.value === "") {
			setActiveTeam(null);
			resetPoints();
			return;
		}

		setActiveTeam(team.shortName);
		handleCurrentTeamInputChange(event, team);
		setInput(Number(event.target.value));
		handleOtherTeamInputChange(event, team);
		setIsInputExceededMaxRoundPoints(
			Number(event.target.value) > gameConfig.maxRoundPoints
		);
	};

	const isTeamFailedBid =
		input > 0 &&
		gameConfig.teams.some(
			(t) =>
				t.isRoundBided && t.score.roundPoints < gameConfig.maxRoundPoints / 2
		);

	const failedTeamName =
		gameConfig.teams.find(
			(t) =>
				t.isRoundBided && t.score.roundPoints < gameConfig.maxRoundPoints / 2
		)?.shortName ?? null;

	return {
		input,
		activeTeam,
		handleChange,
		validations: {
			isInputExceededMaxRoundPoints,
			isTeamFailedBid,
			failedTeamName,
		},
	};
};
