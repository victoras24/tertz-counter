import styles from "./RoundSetup.module.css";

export const RoundSetup: React.FC = () => {
	return (
		<div>
			<div className={styles["round-info"]}>Round</div>

			<button>Next round</button>
		</div>
	);
};
