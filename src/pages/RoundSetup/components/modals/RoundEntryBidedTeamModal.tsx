import { Modal } from "../../../../components/Modal/Modal";
import type { Team } from "../../../../types";

export const RoundEntryBidedTeamModal: React.FC<{ teams: Team[] }> = ({
	teams,
}) => {
	return (
		<Modal>
			<p>Which team bided?</p>
			{teams.map((team) => (
				<button>{team.shortName}</button>
			))}
		</Modal>
	);
};
