import { Modal } from "../../../../components/Modal/Modal";
import { declarations } from "../../../../helper/configs";
import { useGameStore } from "../../../../stores/GameStore";
import type { Teams } from "../../../../types";
import styles from "../Declarations.module.css";

export const RoundEntryDeclarationsModal: React.FC<{
	teamsScore: {
		team: Teams;
		points: number;
	}[];
}> = ({ teamsScore }) => {
	const { setPointsByTeamShortName } = useGameStore();
	return (
		<Modal>
			{declarations.map((d) => (
				<div key={d.name} className={styles["declaration"]}>
					<button className={styles["declaration-name"]}>{d.name}</button>
					<div>
						{teamsScore.map((e) => (
							<div
								key={e.team.shortName}
								className={styles["declaration-team-name-container"]}
							>
								<button
									className={styles["declaration-team-name"]}
									onClick={() =>
										setPointsByTeamShortName(e.team.shortName, d.points)
									}
								>
									{e.team.shortName}
								</button>
							</div>
						))}
					</div>
				</div>
			))}
		</Modal>
	);
};
