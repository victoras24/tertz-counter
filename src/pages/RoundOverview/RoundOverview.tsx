import { useState } from "react";
import { useGameStore } from "../../stores/GameStore";

export const RoundOverview: React.FC = () => {
	const { gameConfig, setPointsByTeamShortName } = useGameStore();
	const [input, setInput] = useState<number>(0);

	return (
		<div>
			{gameConfig.teams.map((team) => (
				<div>
					<label htmlFor={team.shortName}>{team.shortName}</label>
					<input
						type="number"
						max={999}
						onChange={(e) => {
							setPointsByTeamShortName(
								team.shortName,
								input,
								"roundPoints",
								"minus"
							);
							setPointsByTeamShortName(
								team.shortName,
								Number(e.target.value),
								"roundPoints",
								"add"
							);
							setInput(+e.target.value);
						}}
						name={team.shortName}
					/>
					<p>{team.score.roundPoints}</p>
				</div>
			))}
		</div>
	);
};
