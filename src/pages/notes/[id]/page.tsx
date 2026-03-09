import BaseLayout from "@/components/base-layout";
import TranscriptRow from "@/components/transcript-row";
import { API_URI } from "@/config/constants";
import { apiClient } from "@/lib/api";
import { useCallback, useEffect } from "react";
import { useParams } from "react-router";
import { useState } from "react";
import type { Transcript } from "@/types/transcript";
import { makeStringToArray } from "@/lib/utils";
import Heading from "@/components/heading";
import type { Note } from "@/types/note";

const NoteDetailPage = () => {
	const { id } = useParams();
	const [note, setNote] = useState<Note | null>(null);
	const [transcripts, setTranscripts] = useState<Transcript[]>([]);

	const fetchNote = useCallback(async () => {
		try {
			const data = await apiClient<Note>(`${API_URI.NOTES}/${id}`, "GET");
			setNote({
				id: data.id,
				title: data.title,
				updated_at: data.updated_at,
			});
		} catch (error) {
			console.error(error);
		}
	}, [id]);

	const fetchTranscripts = useCallback(async () => {
		try {
			const data = await apiClient<Transcript>(
				`${API_URI.NOTE_TRANSCRIPTS(Number(id))}`,
				"GET",
			);
			const transcripts = makeStringToArray(data.text, ".");
			setTranscripts(transcripts);
		} catch (error) {
			console.error(error);
		}
	}, [id]);

	useEffect(() => {
		fetchTranscripts();
		fetchNote();
	}, [fetchTranscripts, fetchNote]);

	return (
		<BaseLayout>
			<Heading level={1}>{note?.title}</Heading>
			<div className="mt-4">
				{ transcripts.map((item) => (
					<TranscriptRow
						key={item.id}
						text={item.text}
						hasBackground={item.id % 2 === 0}
					/>
				))}
			</div>
		</BaseLayout>
	);
};

export default NoteDetailPage;
