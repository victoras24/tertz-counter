import { useGameStore } from "../../stores/GameStore";
import { inputStyle, teamStyle } from "./RoundOverview.helpers";
import { usePointDeclarationInputChange } from "./usePointDeclarationInputChange";

export const RoundOverview: React.FC = () => {
	const { gameConfig } = useGameStore();
	const { handleChange, validations, input } = usePointDeclarationInputChange();

	return (
		<div>
			{gameConfig.teams.map((team) => (
				<div key={team.shortName}>
					<label
						htmlFor={team.shortName}
						style={teamStyle(gameConfig.maxRoundPoints, team, input)}
					>
						{team.shortName}
					</label>
					<input
						style={inputStyle(validations.isInputExceededMaxRoundPoints)}
						type="number"
						onChange={(event) => handleChange(event, team)}
						name={team.shortName}
					/>
					<p>{team.score.roundPoints}</p>
				</div>
			))}
		</div>
	);
};
