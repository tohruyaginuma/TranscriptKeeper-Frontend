import { auth } from "@/lib/firebase";
import { HTTP_STATUS_CODE } from "@/config/constants";

const getIDToken = async () => {
	const idToken = await auth.currentUser?.getIdToken();
	if (!idToken) {
		throw new Error("No ID token found");
	}
	return idToken;
};

export const apiClient = async <T>(
	url: string,
	method: string = "GET",
	body?: Record<string, unknown>,
) => {
	try {
		const idToken = await getIDToken();
		console.log("idToken", idToken);
		const response = await fetch(url, {
			method: method,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${idToken}`,
			},
			body: JSON.stringify(body),
		});

		if (response.status === HTTP_STATUS_CODE.NO_CONTENT) {
			return undefined as T;
		}

		const data = (await response.json()) as T;
		return data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};
