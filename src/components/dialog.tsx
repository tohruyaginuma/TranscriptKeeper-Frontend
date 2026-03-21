import {
	Dialog as DialogPrimitive,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

import { DialogFooter } from "./ui/dialog";
import { DialogClose } from "./ui/dialog";
import { Button } from "./ui/button";
import type { PropsWithChildren } from "react";

type DialogProps = PropsWithChildren<{
	title: string;
	description: string;
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onConfirm: () => void;
}>;

const Dialog = (props: DialogProps) => {
	const { title, description, children, open, onOpenChange, onConfirm } = props;

	return (
		<DialogPrimitive open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{description}</DialogDescription>
				</DialogHeader>
				<div className="flex items-center gap-2">{children}</div>
				<DialogFooter className="sm:justify-start">
					<DialogClose asChild>
						<Button type="button" variant="outline">
							Cancel
						</Button>
					</DialogClose>
					<Button type="button" onClick={onConfirm}>
						Update
					</Button>
				</DialogFooter>
			</DialogContent>
		</DialogPrimitive>
	);
};

export default Dialog;
