import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router";
import LandingPage from "@/pages/page";
import NotesPage from "@/pages/notes/page";
import NoteDetailPage from "@/pages/notes/[id]/page";
import SignInPage from "@/pages/signin/page";
import SignOutPage from "@/pages/signout/page";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="/notes" element={<NotesPage />} />
				<Route path="/notes/:id" element={<NoteDetailPage />} />
				<Route path="/signout" element={<SignOutPage />} />
				<Route path="/signin" element={<SignInPage />} />
			</Routes>
		</BrowserRouter>
	</StrictMode>,
);
