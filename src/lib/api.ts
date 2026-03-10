import { auth } from "@/lib/firebase";

const getIDToken = async () => {
	const idToken = await auth.currentUser?.getIdToken();
	if (!idToken) {
		throw new Error("No ID token found");
	}
	return idToken;
};

export const apiClient = async <T>(url: string, method: string = "GET") => {
	try {
		const idToken = await getIDToken();
		console.log("idToken", idToken);
		const response = await fetch(url, {
			method: method,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${idToken}`,
			},
		});
		return response.json() as Promise<T>;
	} catch (error) {
		console.error(error);
		throw error;
	}
};
