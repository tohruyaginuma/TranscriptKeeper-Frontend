import { Button } from "@/components/ui/button";
import { auth, provider } from "@/lib/firebase";
import { signInWithPopup, signOut as signOutAuth } from "firebase/auth";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { API_ROOT } from "@/config/constants";

const Top = () => {
	const getIDToken = async () => {
		const idToken = await auth.currentUser?.getIdToken();
		if (!idToken) {
			throw new Error("No ID token found");
		}
		return idToken;
	};

	const signInBackend = async () => {
		const idToken = await getIDToken();
		console.log("idToken", idToken);
		try {
			const response = await fetch(`${API_ROOT}/v1/auth`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${idToken}`,
				},
			});
			const data = await response.json();
			console.log("data", data);
		} catch (error) {
			console.log(error);
		}
	};

	const signIn = async () => {
		console.log("signIn");

		try {
			await signInWithPopup(auth, provider);
			const resultFromBackend = await signInBackend();
			console.log("resultFromBackend", resultFromBackend);
		} catch (error) {
			console.log(error);
		}
	};

	const signOut = async () => {
		console.log("signOut");

		try {
			await signOutAuth(auth);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		const unsub = onAuthStateChanged(auth, (u) => {
			console.log("user", u);
		});

		return () => unsub();
	}, []);

	return (
		<div>
			HELLO WORLD
			<Button onClick={signIn}>signIn()</Button>
			<Button onClick={signOut}>signOut()</Button>
		</div>
	);
};

export default Top;
