import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import { GameStoreProvider } from "./stores/GameStore.tsx";
import { Setup } from "./pages/Setup/Setup.tsx";
import { RoundEntry } from "./pages/RoundEntry/RoundEntry.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<GameStoreProvider>
				<Routes>
					<Route path="/" element={<Setup />} />
					<Route path="/round" element={<RoundEntry />} />
				</Routes>
			</GameStoreProvider>
		</BrowserRouter>
	</StrictMode>
);
