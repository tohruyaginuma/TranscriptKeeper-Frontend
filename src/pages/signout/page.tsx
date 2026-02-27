import { useCallback, useEffect } from "react";
import BaseLayout from "@/components/base-layout";
import { auth } from "@/lib/firebase";
import { signOut as signOutAuth } from "firebase/auth";

const SignOutPage = () => {
	const signOut = useCallback(async () => {
		try {
			await signOutAuth(auth);
		} catch (error) {
			console.log(error);
		}
	}, []);

	useEffect(() => {
		signOut();
	}, [signOut]);

	return <BaseLayout>You signed out successfully</BaseLayout>;
};

export default SignOutPage;
