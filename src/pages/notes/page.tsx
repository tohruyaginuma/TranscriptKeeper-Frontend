import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import {
	FileText,
	Calendar,
	Clock,
	MoreHorizontal,
	Download,
} from "lucide-react";
import BaseLayout from "@/components/base-layout";
import { useState, useCallback, useEffect } from "react";
import { apiClient } from "@/lib/api";
import { API_URI } from "@/config/constants";
import type { Note } from "@/types/note";
import { openDownloadUrl } from "@/lib/utils";
import Loading from "@/components/loading";

const mockNotes = [
	{
		id: "1",
		title: "Product Team Weekly Standup",
		date: "2026-03-20",
		time: "10:00 AM",
		duration: "45 min",
		participants: ["John D.", "Sarah M.", "Mike L."],
		preview:
			"Discussed Q2 roadmap priorities and feature releases. Action items include finalizing the design specs...",
		platform: "Zoom",
	},
	{
		id: "2",
		title: "Interview - Senior Frontend Developer",
		date: "2026-03-19",
		time: "2:30 PM",
		duration: "1h 15min",
		participants: ["HR Team", "Candidate"],
		preview:
			"Technical interview covering React, TypeScript, and system design. Strong candidate with...",
		platform: "Google Meet",
	},
	{
		id: "3",
		title: "Client Onboarding Call - Acme Corp",
		date: "2026-03-18",
		time: "11:00 AM",
		duration: "30 min",
		participants: ["Client Success", "Acme Team"],
		preview:
			"Walked through platform features and integration options. Client interested in enterprise plan...",
		platform: "Microsoft Teams",
	},
	{
		id: "4",
		title: "Engineering Sprint Planning",
		date: "2026-03-17",
		time: "9:00 AM",
		duration: "1h 30min",
		participants: ["Dev Team"],
		preview:
			"Sprint 23 planning session. Prioritized bug fixes and new authentication features...",
		platform: "Zoom",
	},
	{
		id: "5",
		title: "Design Review - Dashboard Redesign",
		date: "2026-03-15",
		time: "3:00 PM",
		duration: "50 min",
		participants: ["Design Team", "Product"],
		preview:
			"Reviewed new dashboard mockups. Feedback on color scheme and navigation structure...",
		platform: "Figma",
	},
];

const NotesPage = () => {
	const [notes, setNotes] = useState<Note[]>([]);
	const [loading, setLoading] = useState(false);

	const fetchNotes = useCallback(async () => {
		setLoading(true);
		try {
			const { notes } = await apiClient<{ notes: Note[] }>(
				`${API_URI.NOTES}`,
				"GET",
			);
			console.log("notes", notes);
			setNotes(notes);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchNotes();
	}, [fetchNotes]);

	return (
		<BaseLayout>
			<div className="max-w-4xl mx-auto py-4">
				{/* Page Header */}
				<div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
					<div>
						<h1 className="text-2xl md:text-3xl font-bold text-foreground">
							My Notes
						</h1>
						<p className="text-muted-foreground mt-1">
							{notes.length} meeting transcripts
						</p>
					</div>
				</div>

				{loading ? (
					<Loading />
				) : notes.length === 0 ? (
					<div className="text-center py-16">
						<div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
							<FileText className="w-8 h-8 text-muted-foreground" />
						</div>
						<h3 className="text-lg font-semibold text-foreground mb-2">
							No notes yet
						</h3>
						<p className="text-muted-foreground mb-6 max-w-md mx-auto">
							Start recording your meetings to create transcripts automatically.
						</p>
						<Button
							variant="outline"
							size="lg"
							className="gap-2 px-8 h-12 text-base"
							onClick={openDownloadUrl}
						>
							<Download className="w-5 h-5" />
							Download Desktop App
						</Button>
					</div>
				) : (
					<div className="space-y-4">
						{notes.map((note) => (
							<Link
								key={note.id}
								to={`/notes/${note.id}`}
								className="block group"
							>
								<div className="p-5 rounded-xl border border-border bg-card hover:border-primary/50 hover:bg-secondary/50 transition-all duration-200">
									<div className="flex items-start justify-between gap-4">
										<div className="flex-1 min-w-0">
											<div className="flex items-center gap-3 mb-2">
												<span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
													{mockNotes[0].platform}
												</span>
												<div className="flex items-center gap-1.5 text-sm text-muted-foreground">
													<Calendar className="w-4 h-4" />
													{mockNotes[0].date}
												</div>
												<div className="flex items-center gap-1.5 text-sm text-muted-foreground">
													<Clock className="w-4 h-4" />
													{mockNotes[0].time}
												</div>
												<span className="text-sm text-muted-foreground">
													{mockNotes[0].duration}
												</span>
											</div>

											<h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-2 truncate">
												{note.title}
											</h3>

											<p className="text-muted-foreground text-sm line-clamp-2 mb-3">
												{mockNotes[0].preview}
											</p>

											<div className="flex items-center gap-2">
												<div className="flex -space-x-2">
													{mockNotes[0].participants
														.slice(0, 3)
														.map((participant, i) => (
															<div
																key={i}
																className="w-7 h-7 rounded-full bg-secondary border-2 border-card flex items-center justify-center text-xs font-medium text-foreground"
															>
																{participant.charAt(0)}
															</div>
														))}
													{mockNotes[0].participants.length > 3 && (
														<div className="w-7 h-7 rounded-full bg-primary/20 border-2 border-card flex items-center justify-center text-xs font-medium text-primary">
															+{mockNotes[0].participants.length - 3}
														</div>
													)}
												</div>
												<span className="text-sm text-muted-foreground">
													{mockNotes[0].participants.join(", ")}
												</span>
											</div>
										</div>

										<Button
											variant="ghost"
											size="icon"
											className="opacity-0 group-hover:opacity-100 transition-opacity"
											onClick={(e) => {
												e.preventDefault();
												e.stopPropagation();
											}}
										>
											<MoreHorizontal className="w-5 h-5" />
										</Button>
									</div>
								</div>
							</Link>
						))}
					</div>
				)}
			</div>
		</BaseLayout>
	);
};

export default NotesPage;
