export const FIREBASE_CONFIG = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY ?? "",
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ?? "",
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ?? "",
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ?? "",
	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ?? "",
	appId: import.meta.env.VITE_FIREBASE_APP_ID ?? "",
	measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID ?? "",
};
export const API_ROOT = import.meta.env.VITE_API_ROOT ?? "";
export const API_URI = {
	AUTH_LOGIN: `${API_ROOT}/v1/auth`,
	NOTES: `${API_ROOT}/v1/notes`,
	NOTE_TRANSCRIPTS: (id: number) => `${API_ROOT}/v1/notes/${id}/transcripts`,
};
export const DOWNLOAD_URL =
	"https://github.com/tohruyaginuma/TranscriptKeeper-Desktop/releases";
