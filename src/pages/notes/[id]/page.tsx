import BaseLayout from "@/components/base-layout";
import TranscriptRow from "@/components/transcript-row";
import { API_URI } from "@/config/constants";
import { apiClient, getApiErrorMessage } from "@/lib/api";
import { useState, useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router";

import type { Transcript } from "@/types/transcript";
import { makeStringToArray } from "@/lib/utils";
import Heading from "@/components/heading";
import type { Note } from "@/types/note";
import { Link } from "react-router";
import { ArrowLeft, Trash, Pencil, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import useAlertDeleteNote from "@/stores/alert-delete-note";
import useDialogUpdateNote from "@/stores/dialog-update-note";
import AlertDialogDestructive from "@/components/alert-dialog-destructive";
import DialogEditNote from "@/components/dialog-edit-note";
import { toast } from "sonner";
import Loading from "@/components/loading";
import ApiErrorState from "@/components/api-error-state";

const NoteDetailPage = () => {
	const { openAlertDeleteNote, closeAlertDeleteNote } = useAlertDeleteNote();
	const { openDialogUpdateNote } = useDialogUpdateNote();

	const { id } = useParams();
	const navigate = useNavigate();

	const [note, setNote] = useState<Note | null>(null);
	const [transcripts, setTranscripts] = useState<Transcript[]>([]);

	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const loadNotePage = useCallback(async () => {
		if (id === undefined) {
			setErrorMessage("This note could not be found.");
			return;
		}

		setLoading(true);
		setErrorMessage(null);
		try {
			const [noteData, transcriptData] = await Promise.all([
				apiClient<Note>(`${API_URI.NOTES}/${id}`, "GET"),
				apiClient<Transcript>(`${API_URI.NOTE_TRANSCRIPTS(Number(id))}`, "GET"),
			]);

			setNote({
				id: noteData.id,
				title: noteData.title,
				updated_at: noteData.updated_at,
			});
			setTranscripts(makeStringToArray(transcriptData.text, "."));
		} catch (error) {
			setErrorMessage(getApiErrorMessage(error));
		} finally {
			setLoading(false);
		}
	}, [id]);

	const deleteNote = useCallback(
		async (id: number) => {
			try {
				await apiClient<void>(`${API_URI.NOTES}/${id}`, "DELETE");

				closeAlertDeleteNote();
				toast("Note has been deleted.");
				navigate("/notes");
			} catch (error) {
				toast.error(getApiErrorMessage(error));
			}
		},
		[closeAlertDeleteNote, navigate],
	);

	useEffect(() => {
		void loadNotePage();
	}, [loadNotePage]);

	return (
		<BaseLayout>
			<div className="max-w-4xl mx-auto py-8">
				{loading ? (
					<Loading />
				) : errorMessage ? (
					<ApiErrorState
						title="Unable to load this note"
						message={errorMessage}
						onRetry={() => {
							void loadNotePage();
						}}
					>
						<Button asChild variant="outline">
							<Link to="/notes">Back to notes</Link>
						</Button>
					</ApiErrorState>
				) : (
					<>
						<div className="flex items-center justify-between">
							<Heading level={1}>{note?.title}</Heading>
							<div className="flex items-center gap-4">
								<Button
									variant="destructive"
									size="icon"
									onClick={(e) => {
										e.preventDefault();
										e.stopPropagation();
										openAlertDeleteNote(Number(id));
									}}
								>
									<Trash className="w-5 h-5" />
								</Button>
								<Button
									variant="ghost"
									size="icon"
									onClick={(e) => {
										e.preventDefault();
										e.stopPropagation();
										openDialogUpdateNote(Number(id), note?.title || "Untitled");
									}}
								>
									<Pencil className="w-5 h-5" />
								</Button>
							</div>
						</div>

						<div className="mt-8">
							{transcripts.length === 0 ? (
								<div className="text-center py-16">
									<div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
										<FileText className="w-8 h-8 text-muted-foreground" />
									</div>
									<h3 className="text-lg font-semibold text-foreground mb-2">
										No transcripts yet
									</h3>
									<p className="text-muted-foreground mb-6 max-w-md mx-auto">
										Start recording your meetings to create transcripts
										automatically.
									</p>
								</div>
							) : (
								transcripts.map((item) => (
									<TranscriptRow
										key={item.id}
										text={item.text}
										hasBackground={item.id % 2 === 0}
									/>
								))
							)}
						</div>
						<div className="text-center mt-6">
							<Link
								to="/notes"
								className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
							>
								<ArrowLeft className="mr-2 h-4 w-4" />
								Back to notes
							</Link>
						</div>
					</>
				)}
			</div>
			<AlertDialogDestructive
				title="Delete note?"
				description="This will permanently delete this note."
				onConfirm={deleteNote}
			/>
			<DialogEditNote callback={loadNotePage} />
		</BaseLayout>
	);
};

export default NoteDetailPage;
