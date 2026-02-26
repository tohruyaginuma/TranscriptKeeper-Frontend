import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { FIREBASE_CONFIG } from "@/config/constants";
import { getAnalytics } from "firebase/analytics";

export const app = initializeApp(FIREBASE_CONFIG);
export const auth = getAuth(app);

export const analytics = getAnalytics(app);
export const provider = new GoogleAuthProvider();
