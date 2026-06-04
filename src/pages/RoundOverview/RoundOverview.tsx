import { useGameStore } from "../../stores/GameStore";
import { usePointDeclarationInputChange } from "./usePointDeclarationInputChange";

export const RoundOverview: React.FC = () => {
	const { gameConfig } = useGameStore();
	const { handleChange } = usePointDeclarationInputChange();

	return (
		<div>
			{gameConfig.teams.map((team) => (
				<div key={team.shortName}>
					<label htmlFor={team.shortName}>{team.shortName}</label>
					<input
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
