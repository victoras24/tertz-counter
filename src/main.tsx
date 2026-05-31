import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import { GameStoreProvider } from "./stores/GameStoreProvider.tsx";
import { GameSetup } from "./pages/GameSetup/GameSetup.tsx";
import { RoundSetup } from "./pages/RoundSetup/RoundSetup.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<GameStoreProvider>
				<Routes>
					<Route path="/" element={<GameSetup />} />
					<Route path="/round" element={<RoundSetup />} />
				</Routes>
			</GameStoreProvider>
		</BrowserRouter>
	</StrictMode>
);
