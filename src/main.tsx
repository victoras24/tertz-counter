import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import { GameStoreProvider } from "./stores/GameStoreProvider.tsx";
import { GameSetup } from "./pages/GameSetup/GameSetup.tsx";
import { RoundSetup } from "./pages/RoundSetup/RoundSetup.tsx";
import { BidedTeamAndSuit } from "./pages/RoundSetup/BidedTeamAndSuit/BidedTeamAndSuit.tsx";
import { ExtraDeclarations } from "./pages/RoundSetup/ExtraDeclarations/ExtraDeclarations.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<GameStoreProvider>
				<Routes>
					<Route path="/" element={<GameSetup />} />
					<Route path="/bid" element={<BidedTeamAndSuit />} />
					<Route path="/extra-declarations" element={<ExtraDeclarations />} />
					<Route path="/round" element={<RoundSetup />} />
				</Routes>
			</GameStoreProvider>
		</BrowserRouter>
	</StrictMode>
);
