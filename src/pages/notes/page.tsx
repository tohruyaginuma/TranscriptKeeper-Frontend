import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import {
	FileText,
	Calendar,
	Clock,
	Pencil,
	Download,
	Trash,
} from "lucide-react";
import BaseLayout from "@/components/base-layout";
import { useState, useCallback, useEffect } from "react";
import { apiClient, getApiErrorMessage } from "@/lib/api";
import { API_URI } from "@/config/constants";
import type { Note } from "@/types/note";
import Loading from "@/components/loading";
import dayjs from "dayjs";
import useAlertDeleteNote from "@/stores/alert-delete-note";
import AlertDialogDestructive from "@/components/alert-dialog-destructive";
import useDialogUpdateNote from "@/stores/dialog-update-note";
import DialogEditNote from "@/components/dialog-edit-note";
import { toast } from "sonner";
import ApiErrorState from "@/components/api-error-state";

const NotesPage = () => {
	const { openAlertDeleteNote, closeAlertDeleteNote } = useAlertDeleteNote();
	const { openDialogUpdateNote } = useDialogUpdateNote();

	const [notes, setNotes] = useState<Note[]>([]);
	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const fetchNotes = useCallback(async () => {
		setLoading(true);
		setErrorMessage(null);
		try {
			const { notes } = await apiClient<{ notes: Note[] }>(
				`${API_URI.NOTES}`,
				"GET",
			);
			setNotes(notes);
		} catch (error) {
			setErrorMessage(getApiErrorMessage(error));
		} finally {
			setLoading(false);
		}
	}, []);

	const deleteNote = useCallback(
		async (id: number) => {
			try {
				await apiClient<void>(`${API_URI.NOTES}/${id}`, "DELETE");
				toast("Note has been deleted.");
				closeAlertDeleteNote();
				await fetchNotes();
			} catch (error) {
				toast.error(getApiErrorMessage(error));
			}
		},
		[closeAlertDeleteNote, fetchNotes],
	);

	useEffect(() => {
		void fetchNotes();
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

				{loading && notes.length === 0 ? (
					<Loading />
				) : (
					<>
						{errorMessage && (
							<ApiErrorState
								title="Unable to load your notes"
								message={errorMessage}
								onRetry={() => {
									void fetchNotes();
								}}
								className="mb-6"
							>
								<Button
									asChild
									variant="outline"
								>
									<Link to="/download">
										<Download className="w-5 h-5" />
										Download Desktop App
									</Link>
								</Button>
							</ApiErrorState>
						)}
						{notes.length === 0 && errorMessage === null ? (
							<div className="text-center py-16">
								<div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
									<FileText className="w-8 h-8 text-muted-foreground" />
								</div>
								<h3 className="text-lg font-semibold text-foreground mb-2">
									No notes yet
								</h3>
								<p className="text-muted-foreground mb-6 max-w-md mx-auto">
									Start recording your meetings to create transcripts
									automatically.
								</p>
								<Button
									asChild
									variant="outline"
									size="lg"
									className="gap-2 px-8 h-12 text-base"
								>
									<Link to="/download">
										<Download className="w-5 h-5" />
										Download Desktop App
									</Link>
								</Button>
							</div>
						) : null}
						{notes.length > 0 ? (
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
														<div className="flex items-center gap-1.5 text-sm text-muted-foreground">
															<Calendar className="w-4 h-4" />
															{dayjs(note.updated_at).format("DD MMM YYYY")}
														</div>
														<div className="flex items-center gap-1.5 text-sm text-muted-foreground">
															<Clock className="w-4 h-4" />
															{dayjs(note.updated_at).format("HH:mm")}
														</div>
													</div>

													<h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-2 truncate">
														{note.title}
													</h3>
												</div>
												<Button
													variant="destructive"
													size="icon"
													className="opacity-0 group-hover:opacity-100 transition-opacity"
													onClick={(e) => {
														e.preventDefault();
														e.stopPropagation();
														openAlertDeleteNote(note.id);
													}}
												>
													<Trash className="w-5 h-5" />
												</Button>
												<Button
													variant="ghost"
													size="icon"
													className="opacity-0 group-hover:opacity-100 transition-opacity"
													onClick={(e) => {
														e.preventDefault();
														e.stopPropagation();

														openDialogUpdateNote(note.id, note.title);
													}}
												>
													<Pencil className="w-5 h-5" />
												</Button>
											</div>
										</div>
									</Link>
								))}
							</div>
						) : null}
					</>
				)}
			</div>
			<AlertDialogDestructive
				title="Delete note?"
				description="This will permanently delete this note."
				onConfirm={deleteNote}
			/>
			<DialogEditNote callback={fetchNotes} />
		</BaseLayout>
	);
};

export default NotesPage;
