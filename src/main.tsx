import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./main.css";
import { GameStoreProvider } from "./stores/GameStoreProvider.tsx";
import { GameSetup } from "./pages/GameSetup/GameSetup.tsx";

import { Layout } from "./layout.tsx";
import { ExtraDeclarations } from "./pages/RoundSetup/ExtraDeclarations/ExtraDeclarations.tsx";
import { RoundOverview } from "./pages/RoundOverview/RoundOverview.tsx";
import { Scoreboard } from "./pages/Scoreboard/scoreboard.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<GameStoreProvider>
				<Routes>
					<Route element={<Layout />}>
						<Route path="/" element={<GameSetup />} />
						<Route path="/round-setup" element={<ExtraDeclarations />} />
						<Route path="/round-overview" element={<RoundOverview />} />
						<Route path="/scoreboard" element={<Scoreboard />} />
					</Route>
				</Routes>
			</GameStoreProvider>
		</BrowserRouter>
	</StrictMode>
);
