import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router";
import LandingPage from "@/pages/page";
import NotesPage from "@/pages/notes/page";
import NoteDetailPage from "@/pages/notes/[id]/page";
import SignInPage from "@/pages/signin/page";
import SignOutPage from "@/pages/signout/page";
import AuthProvider from "@/components/auth-provider";
import AuthGuard from "@/components/auth-guard";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<AuthProvider>
				<Routes>
					<Route
						path="/notes"
						element={
							<AuthGuard>
								<NotesPage />
							</AuthGuard>
						}
					/>
					<Route
						path="/notes/:id"
						element={
							<AuthGuard>
								<NoteDetailPage />
							</AuthGuard>
						}
					/>
					<Route path="/" element={<LandingPage />} />
					<Route path="/signout" element={<SignOutPage />} />
					<Route path="/signin" element={<SignInPage />} />
				</Routes>
			</AuthProvider>
		</BrowserRouter>
	</StrictMode>,
);
