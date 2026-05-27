import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Setup } from "./pages/Setup/Setup";
import { RoundEntry } from "./pages/RoundEntry/RoundEntry";

function App() {
	return (
		<div className="app-shell">
			<Routes>
				<Route path="/" element={<Setup />} />
				<Route path="/round" element={<RoundEntry />} />
			</Routes>
		</div>
	);
}

export default App;
