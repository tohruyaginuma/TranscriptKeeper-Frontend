import BaseLayout from "@/components/base-layout";
import TranscriptRow from "@/components/transcript-row";
import { API_URI } from "@/config/constants";
import { apiClient } from "@/lib/api";
import { useState, useCallback, useEffect } from "react";
import { useParams } from "react-router";

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

const NoteDetailPage = () => {
	const { openAlertDeleteNote, closeAlertDeleteNote } = useAlertDeleteNote();
	const { openDialogUpdateNote } = useDialogUpdateNote();

	const { id } = useParams();

	const [note, setNote] = useState<Note | null>(null);
	const [transcripts, setTranscripts] = useState<Transcript[]>([]);

	const [loadingNote, setLoadingNote] = useState(false);
	const [loadingTranscripts, setLoadingTranscripts] = useState(false);

	const fetchNote = useCallback(async () => {
		setLoadingNote(true);
		try {
			const data = await apiClient<Note>(`${API_URI.NOTES}/${id}`, "GET");
			setNote({
				id: data.id,
				title: data.title,
				updated_at: data.updated_at,
			});
		} catch (error) {
			console.error(error);
		} finally {
			setLoadingNote(false);
		}
	}, [id]);

	const fetchTranscripts = useCallback(async () => {
		setLoadingTranscripts(true);
		try {
			const data = await apiClient<Transcript>(
				`${API_URI.NOTE_TRANSCRIPTS(Number(id))}`,
				"GET",
			);
			const transcripts = makeStringToArray(data.text, ".");
			setTranscripts(transcripts);
		} catch (error) {
			console.error(error);
		} finally {
			setLoadingTranscripts(false);
		}
	}, [id]);

	const deleteNote = useCallback(
		async (id: number) => {
			try {
				await apiClient<void>(`${API_URI.NOTES}/${id}`, "DELETE");
				toast("Note has been deleted.");
				closeAlertDeleteNote();
			} catch (error) {
				console.error(error);
				toast.error("Failed to delete note.");
			} finally {
				fetchNote();
			}
		},
		[closeAlertDeleteNote, fetchNote],
	);

	useEffect(() => {
		fetchTranscripts();
		fetchNote();
	}, [fetchTranscripts, fetchNote]);

	return (
		<BaseLayout>
			<div className="max-w-4xl mx-auto py-8">
				{loadingNote ? (
					<Loading />
				) : (
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
				)}

				<div className="mt-8">
					{loadingTranscripts ? (
						<Loading />
					) : transcripts.length === 0 ? (
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
			</div>
			<AlertDialogDestructive
				title="Delete note?"
				description="This will permanently delete this note."
				onConfirm={deleteNote}
			/>
			<DialogEditNote callback={fetchNote} />
		</BaseLayout>
	);
};

export default NoteDetailPage;
