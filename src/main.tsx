import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router";
import LandingPage from "@/pages/page";
import NotesPage from "@/pages/notes/page";
import NoteDetailPage from "@/pages/notes/[id]/page";
import SignInPage from "@/pages/signin/page";
import SignOutPage from "@/pages/signout/page";
import DownloadPage from "@/pages/download/page";
import AuthProvider from "@/components/auth-provider";
import AuthGuard from "@/components/auth-guard";
import { Toaster } from "@/components/ui/sonner";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<AuthProvider>
				<Toaster />
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
					<Route path="/download" element={<DownloadPage />} />
					<Route path="/signout" element={<SignOutPage />} />
					<Route path="/signin" element={<SignInPage />} />
				</Routes>
			</AuthProvider>
		</BrowserRouter>
	</StrictMode>,
);
