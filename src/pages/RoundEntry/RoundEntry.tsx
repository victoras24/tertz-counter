import { useGameStore } from "../../stores/GameStore";

export const RoundEntry: React.FC = () => {
	const { config } = useGameStore();
	console.log(config);
	return (
		<div>
			<div>
				<h1>
					{config.players.you.shortName} {config.players.partner.shortName}
				</h1>
			</div>
			<div>
				<h1>
					{config.players.front.shortName} {config.players.right.shortName}
				</h1>
			</div>
		</div>
	);
};
