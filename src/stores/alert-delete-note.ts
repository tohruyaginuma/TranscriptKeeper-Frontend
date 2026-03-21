import { create } from "zustand";

type AlertDeleteNoteState = {
	open: boolean;
	id: number;
	openAlertDeleteNote: (id: number) => void;
	closeAlertDeleteNote: () => void;
};

const useAlertDeleteNote = create<AlertDeleteNoteState>((set) => ({
	open: false,
	id: 0,
	openAlertDeleteNote: (id: number) => set({ open: true, id }),
	closeAlertDeleteNote: () => set({ open: false }),
}));

export default useAlertDeleteNote;
