import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./RoundSetup.module.css";
import { declarations } from "../../helper/configs";
import { useGameStore } from "../../stores/GameStore";
import { Teams } from "./components/Teams";
import { SuitPicker } from "../../components/suit-picker";
import { DeclarationCard } from "../../components/declaration-card";
import { Button } from "../../components/button";

export const RoundSetup: React.FC = () => {
	const [step, setStep] = React.useState<"bid" | "declare">("bid");
	const [useCounts, setUseCounts] = React.useState<Record<string, number>>(
		Object.fromEntries(declarations.map((d) => [d.name, 0]))
	);

	const {
		gameConfig,
		setBidedSuit,
		setBidedTeam,
		setPointsByTeamShortName,
		setGameConfig,
	} = useGameStore();
	const navigate = useNavigate();

	const canAdvanceFromBid =
		gameConfig.bidedSuit !== "" && gameConfig.bidedTeam !== "";

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h1>{step === "bid" ? "BIDDING" : "DECLARATIONS"}</h1>
				<span className={styles.tagPill}>
					Round {gameConfig.gameHistory.length + 1}
				</span>
			</div>

			<div className={styles.steps}>
				<div
					className={`${styles.step} ${
						step === "bid" ? styles.stepActive : styles.stepDone
					}`}
				>
					<div className={styles.stepDot} />
					<span className={styles.stepLabel}>Bid</span>
				</div>
				<div className={styles.stepLine} />
				<div
					className={`${styles.step} ${
						step === "declare" ? styles.stepActive : styles.stepIdle
					}`}
				>
					<div className={styles.stepDot} />
					<span className={styles.stepLabel}>Declare</span>
				</div>
			</div>

			<Teams
				config={gameConfig}
				setTeam={(bidedTeam) => setBidedTeam(bidedTeam)}
				setGameConfig={setGameConfig}
				selected={gameConfig.bidedTeam}
			/>

			{step === "bid" ? (
				<div className={styles.content}>
					<p className={styles.sectionTitle}>Choose suit</p>
					<SuitPicker selected={gameConfig.bidedSuit} onChange={setBidedSuit} />
				</div>
			) : (
				<div className={styles.content}>
					{declarations.map((d) => (
						<DeclarationCard
							key={d.name}
							name={d.name}
							points={d.points}
							useLimit={d.useLimit}
							useCount={useCounts[d.name]}
							icons={d.icons}
							onClick={() => {
								setUseCounts((prev) => ({
									...prev,
									[d.name]: prev[d.name] + 1,
								}));
								setPointsByTeamShortName(
									gameConfig.bidedTeam,
									d.points,
									"roundPoints",
									"add"
								);
								setGameConfig((prev) => ({
									...prev,
									maxRoundPoints: prev.maxRoundPoints + d.points,
								}));
							}}
							onRemove={() => {
								if (useCounts[d.name] === 0) return;
								setUseCounts((prev) => ({
									...prev,
									[d.name]: prev[d.name] - 1,
								}));
								setPointsByTeamShortName(
									gameConfig.bidedTeam,
									d.points,
									"roundPoints",
									"minus"
								);
								setGameConfig((prev) => ({
									...prev,
									maxRoundPoints: prev.maxRoundPoints - d.points,
								}));
							}}
						/>
					))}
				</div>
			)}

			<div className={styles.spacer} />

			{step === "bid" ? (
				<Button
					label="Next"
					disabled={!canAdvanceFromBid}
					onClick={() => setStep("declare")}
				/>
			) : (
				<Button
					label="Next"
					onClick={() => {
						navigate("/round-overview");
						setGameConfig((prev) => ({
							...prev,
							teams: prev.teams.map((prevTeam) => {
								if (prevTeam.shortName === gameConfig.bidedTeam) {
									return {
										...prevTeam,
										score: {
											...prevTeam.score,
											roundDeclarations: prev.maxRoundPoints - 160,
										},
									};
								}
								return prevTeam;
							}),
						}));
					}}
				/>
			)}
		</div>
	);
};
