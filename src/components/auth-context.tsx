import { createContext } from "react";
import { type User } from "firebase/auth";

export type AuthContextType = {
	isLoading: boolean;
	user: User | null;
};

export const AuthContext = createContext<AuthContextType>({
	isLoading: true,
	user: null,
});
