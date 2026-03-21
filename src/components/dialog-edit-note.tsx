import {
	useCallback,
	useState,
	useEffect,
	type PropsWithChildren,
} from "react";
import Dialog from "@/components/dialog";
import useDialogUpdateNote from "@/stores/dialog-update-note";
import { toast } from "sonner";
import { API_URI } from "@/config/constants";
import { apiClient } from "@/lib/api";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

type DialogProps = PropsWithChildren<{
	callback: () => void;
}>;

const DialogEditNote = (props: DialogProps) => {
	const { callback } = props;
	const { open, closeDialogUpdateNote, id, defaultTitle } =
		useDialogUpdateNote();

	const [inputTitle, setInputTitle] = useState("");

	const updateNote = useCallback(async () => {
		try {
			await apiClient<void>(`${API_URI.NOTES}/${id}`, "PUT", {
				title: inputTitle,
			});
			toast("Note has been updated.");
		} catch (error) {
			console.error(error);
			toast.error("Failed to update note.");
		} finally {
			closeDialogUpdateNote();
			callback?.();
		}
	}, [closeDialogUpdateNote, callback, id, inputTitle]);

	useEffect(() => {
		setInputTitle(defaultTitle);
	}, [defaultTitle]);

	return (
		<Dialog
			title="Update note"
			description="You can update the title of this note."
			open={open}
			onOpenChange={closeDialogUpdateNote}
			onConfirm={updateNote}
		>
			<div className="grid flex-1 gap-2">
				<Label htmlFor="title">Title</Label>
				<Input
					id="title"
					value={inputTitle}
					onChange={(e) => setInputTitle(e.target.value)}
				/>
			</div>
		</Dialog>
	);
};

export default DialogEditNote;
