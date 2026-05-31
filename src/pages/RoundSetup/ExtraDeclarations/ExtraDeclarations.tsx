import { declarations } from "../../../helper/configs";
import { useGameStore } from "../../../stores/GameStore";
import { Teams } from "../components/Teams";

export const ExtraDeclarations: React.FC = () => {
	const { gameConfig, setBidedTeam, bidedTeam, setPointsByTeamShortName } =
		useGameStore();

	return (
		<div>
			<div>{}</div>
			<Teams config={gameConfig} setTeam={setBidedTeam} />
			{declarations.map((d) => (
				<div key={d.name}>
					<button>{d.name}</button>
					<div>
						{Object.keys(gameConfig.teams).map((team) => (
							<div key={team}>
								<button
									onClick={() => setPointsByTeamShortName(bidedTeam, d.points)}
								>
									{team}
								</button>
							</div>
						))}
					</div>
				</div>
			))}
		</div>
	);
};
