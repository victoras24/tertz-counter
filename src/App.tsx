import { Routes, Route } from "react-router-dom";
import "./App.css";
import { GameSetup } from "./pages/GameSetup/GameSetup";
import { RoundSetup } from "./pages/RoundSetup/RoundSetup";
import { BidedTeamAndSuit } from "./pages/RoundSetup/BidedTeamAndSuit/BidedTeamAndSuit";

function App() {
	return (
		<div className="app-shell">
			<Routes>
				<Route path="/" element={<GameSetup />} />
				<Route path="/bid" element={<BidedTeamAndSuit />} />
				<Route path="/round" element={<RoundSetup />} />
			</Routes>
		</div>
	);
}

export default App;
