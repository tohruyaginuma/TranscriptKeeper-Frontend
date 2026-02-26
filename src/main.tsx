import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Top from "@/pages/page";
import Notes from "@/pages/notes/page";
import NoteDetail from "./pages/notes/[id]/page";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Top />} />
				<Route path="/notes" element={<Notes />} />
				<Route path="/notes/:id" element={<NoteDetail />} />
			</Routes>
		</BrowserRouter>
	</StrictMode>,
);
