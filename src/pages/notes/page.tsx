import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import BaseLayout from "@/components/base-layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { API_URI } from "@/config/constants";
import { useCallback, useEffect, useState } from "react";
import { apiClient } from "@/lib/api";
import type { Note } from "@/types/note";

const NotesPage = () => {
	const [notes, setNotes] = useState<Note[]>([]);

	const fetchNotes = useCallback(async () => {
		try {
			const { notes } = await apiClient<{ notes: Note[] }>(
				`${API_URI.NOTES}`,
				"GET",
			);

			setNotes(notes);
		} catch (error) {
			console.error(error);
		}
	}, []);

	useEffect(() => {
		fetchNotes();
	}, [fetchNotes]);

	return (
		<BaseLayout>
			<Table className="w-full">
				<TableHeader>
					<TableRow>
						<TableHead className="w-2/4">Title</TableHead>
						<TableHead>Updated At</TableHead>
						<TableHead className="text-right">Action</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{notes.map((note) => (
						<TableRow key={note.id}>
							<TableCell className="font-medium">{note.title}</TableCell>
							<TableCell>{note.updated_at}</TableCell>
							<TableCell className="text-right">
								<Button variant="outline">
									<Link to={`/notes/${note.id}`}>View</Link>
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</BaseLayout>
	);
};

export default NotesPage;
