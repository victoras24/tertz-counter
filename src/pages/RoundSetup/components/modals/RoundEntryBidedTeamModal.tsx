import { Modal } from "../../../../components/Modal/Modal";
import type { Teams } from "../../../../types";

export const RoundEntryBidedTeamModal: React.FC<{ teams: Teams[] }> = ({
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
