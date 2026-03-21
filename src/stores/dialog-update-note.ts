import { create } from "zustand";

type DialogUpdateNoteState = {
	open: boolean;
	id: number;
	defaultTitle: string;
	openDialogUpdateNote: (id: number, defaultTitle: string) => void;
	closeDialogUpdateNote: () => void;
};

const useDialogUpdateNote = create<DialogUpdateNoteState>((set) => ({
	open: false,
	id: 0,
	defaultTitle: "",
	openDialogUpdateNote: (id: number, defaultTitle: string) =>
		set({ open: true, id, defaultTitle }),
	closeDialogUpdateNote: () => set({ open: false }),
}));

export default useDialogUpdateNote;
