import { useNavigate } from "react-router-dom";
import { useGameStore } from "../../stores/GameStore";
import { inputStyle, teamStyle } from "./RoundOverview.helpers";
import { usePointDeclarationInputChange } from "./usePointDeclarationInputChange";

export const RoundOverview: React.FC = () => {
	const { gameConfig, nextRound } = useGameStore();
	const { handleChange, validations, input } = usePointDeclarationInputChange();
	const navigate = useNavigate();

	return (
		<div>
			<button onClick={() => navigate("/extra-declarations")}>
				Back button
			</button>
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
			<button onClick={() => nextRound(0)}>Next round</button>
		</div>
	);
};
