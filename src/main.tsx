import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./main.css";
import { GameStoreProvider } from "./stores/GameStoreProvider.tsx";
import { GameSetup } from "./pages/GameSetup/GameSetup.tsx";
import { BidedTeamAndSuit } from "./pages/RoundSetup/BidedTeamAndSuit/BidedTeamAndSuit.tsx";
import { ExtraDeclarations } from "./pages/RoundSetup/ExtraDeclarations/ExtraDeclarations.tsx";
import { RoundOverview } from "./pages/RoundOverview/RoundOverview.tsx";
import { Layout } from "./layout.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<GameStoreProvider>
				<Routes>
					<Route element={<Layout />}>
						<Route path="/" element={<GameSetup />} />
						<Route path="/bid" element={<BidedTeamAndSuit />} />
						<Route path="/extra-declarations" element={<ExtraDeclarations />} />
						<Route path="/round-overview" element={<RoundOverview />} />
					</Route>
				</Routes>
			</GameStoreProvider>
		</BrowserRouter>
	</StrictMode>
);
