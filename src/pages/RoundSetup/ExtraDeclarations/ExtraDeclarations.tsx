import { declarations } from "../../../helper/configs";
import { useGameStore } from "../../../stores/GameStore";
import { Teams } from "../components/Teams";

export const ExtraDeclarations: React.FC = () => {
	const { gameConfig, setBidedTeam, bidedTeam, setPointsByTeamShortName } =
		useGameStore();

	return (
		<div>
			<Teams config={gameConfig} setTeam={setBidedTeam} />
			{declarations.map((d) => (
				<div key={d.name}>
					<button
						onClick={() =>
							setPointsByTeamShortName(bidedTeam, d.points, "roundPoints")
						}
					>
						{d.name}
					</button>
				</div>
			))}
		</div>
	);
};
