import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogMedia,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import useAlertDeleteNote from "@/stores/alert-delete-note";
import { Trash2Icon } from "lucide-react";

type AlertDialogDestructiveProps = {
	title: string;
	description: string;
	onConfirm: (id: number) => void;
};

const AlertDialogDestructive = (props: AlertDialogDestructiveProps) => {
	const { title, description, onConfirm } = props;
	const { open, closeAlertDeleteNote, id } = useAlertDeleteNote();

	return (
		<AlertDialog open={open}>
			<AlertDialogContent size="sm">
				<AlertDialogHeader>
					<AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
						<Trash2Icon />
					</AlertDialogMedia>
					<AlertDialogTitle>{title}</AlertDialogTitle>
					<AlertDialogDescription>{description}</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel variant="outline" onClick={closeAlertDeleteNote}>
						Cancel
					</AlertDialogCancel>
					<AlertDialogAction
						variant="destructive"
						onClick={() => onConfirm(id)}
					>
						Delete
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default AlertDialogDestructive;
