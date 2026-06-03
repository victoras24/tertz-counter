import { useNavigate } from "react-router-dom";
import { declarations } from "../../../helper/configs";
import { useGameStore } from "../../../stores/GameStore";
import { Teams } from "../components/Teams";

export const ExtraDeclarations: React.FC = () => {
	const {
		gameConfig,
		setBidedTeam,
		bidedTeam,
		setPointsByTeamShortName,
		setGameConfig,
	} = useGameStore();
	const navigate = useNavigate();

	return (
		<div>
			<Teams
				config={gameConfig}
				setTeam={setBidedTeam}
				setGameConfig={setGameConfig}
			/>
			{declarations.map((d) => (
				<div key={d.name}>
					<button
						onClick={() => {
							setPointsByTeamShortName(
								bidedTeam,
								d.points,
								"roundPoints",
								"add"
							);
							setGameConfig((prev) => ({
								...prev,
								maxRoundPoints: prev.maxRoundPoints + d.points,
							}));
						}}
					>
						{d.name}
					</button>
				</div>
			))}
			<button
				onClick={() => {
					navigate("/round-overview");
					setGameConfig((prev) => ({
						...prev,
						teams: [
							...prev.teams.map((prevTeam) => {
								if (prevTeam.shortName === bidedTeam) {
									return {
										...prevTeam,
										score: {
											...prevTeam.score,
											roundDeclarations: prev.maxRoundPoints - 160,
										},
									};
								} else {
									return prevTeam;
								}
							}),
						],
					}));
				}}
			>
				Next
			</button>
		</div>
	);
};
