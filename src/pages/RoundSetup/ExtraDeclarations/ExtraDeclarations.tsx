import { declarations } from "../../../helper/configs";
import { useGameStore } from "../../../stores/GameStore";
import { Teams } from "../components/Teams";

export const ExtraDeclarations: React.FC = () => {
	const { roundPoints, config, setBidedTeam } = useGameStore();

	return (
		<div>
			<Teams config={config} setTeam={setBidedTeam} />
			{declarations.map((d) => (
				<div key={d.name}>
					<button>{d.name}</button>
				</div>
			))}
		</div>
	);
};
