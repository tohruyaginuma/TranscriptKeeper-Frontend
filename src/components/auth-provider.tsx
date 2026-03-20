import { auth } from "@/lib/firebase";
import { type User, onAuthStateChanged } from "firebase/auth";
import { useEffect, useMemo, useState } from "react";
import type { PropsWithChildren } from "react";
import Loading from "@/components/loading";
import { AuthContext, type AuthContextType } from "@/components/auth-context";

type AuthProviderProps = PropsWithChildren<object>;

const AuthProvider = (props: AuthProviderProps) => {
	const { children } = props;

	const [isLoading, setIsLoading] = useState(true);
	const [user, setUser] = useState<User | null>(null);

	const value: AuthContextType = useMemo(
		() => ({
			isLoading: isLoading,
			user: user,
		}),
		[user, isLoading],
	);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setUser(user);
			setIsLoading(false);
		});
		return () => unsubscribe();
	}, []);

	return (
		<AuthContext.Provider value={value}>
			{isLoading ? <Loading /> : children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
