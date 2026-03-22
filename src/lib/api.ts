import { auth } from "@/lib/firebase";
import { API_ROOT, HTTP_STATUS_CODE } from "@/config/constants";

type ApiClientErrorKind = "AUTH" | "HTTP" | "NETWORK" | "UNKNOWN";

export class ApiClientError extends Error {
	kind: ApiClientErrorKind;
	status?: number;
	url?: string;

	constructor(
		kind: ApiClientErrorKind,
		message: string,
		options?: {
			status?: number;
			url?: string;
		},
	) {
		super(message);
		this.name = "ApiClientError";
		this.kind = kind;
		this.status = options?.status;
		this.url = options?.url;
	}
}

const getIDToken = async () => {
	const idToken = await auth.currentUser?.getIdToken();
	if (!idToken) {
		throw new Error("No ID token found");
	}
	return idToken;
};

const getApiTarget = (url: string) => {
	if (API_ROOT !== "") {
		return API_ROOT;
	}

	try {
		return new URL(url, window.location.origin).origin;
	} catch {
		return "the API";
	}
};

const getErrorMessageFromResponse = async (response: Response) => {
	const contentType = response.headers.get("content-type") ?? "";

	if (contentType.includes("application/json")) {
		const data = (await response.json()) as { message?: string };
		if (typeof data.message === "string" && data.message.trim() !== "") {
			return data.message;
		}
	}

	const text = await response.text();
	if (text.trim() !== "") {
		return text;
	}

	return `Request failed with status ${response.status}.`;
};

export const getApiErrorMessage = (error: unknown) => {
	if (error instanceof ApiClientError) {
		return error.message;
	}

	if (error instanceof Error && error.message === "No ID token found") {
		return "Please sign in again and retry.";
	}

	return "Something went wrong while contacting TranscriptKeeper.";
};

export const apiClient = async <T>(
	url: string,
	method: string = "GET",
	body?: Record<string, unknown>,
) => {
	try {
		const idToken = await getIDToken();
		const headers: Record<string, string> = {
			Authorization: `Bearer ${idToken}`,
		};

		if (body !== undefined) {
			headers["Content-Type"] = "application/json";
		}

		const response = await fetch(url, {
			method: method,
			headers,
			...(body !== undefined && method !== "GET" && method !== "HEAD"
				? { body: JSON.stringify(body) }
				: {}),
		});

		if (!response.ok) {
			throw new ApiClientError(
				"HTTP",
				await getErrorMessageFromResponse(response),
				{
					status: response.status,
					url,
				},
			);
		}

		if (response.status === HTTP_STATUS_CODE.NO_CONTENT) {
			return undefined as T;
		}

		const contentType = response.headers.get("content-type") ?? "";
		if (!contentType.includes("application/json")) {
			return undefined as T;
		}

		const data = (await response.json()) as T;
		return data;
	} catch (error) {
		if (error instanceof ApiClientError) {
			throw error;
		}

		if (error instanceof Error && error.message === "No ID token found") {
			throw new ApiClientError("AUTH", "Please sign in again and retry.", {
				url,
			});
		}

		if (error instanceof TypeError) {
			throw new ApiClientError(
				"NETWORK",
				`Unable to reach the API at ${getApiTarget(url)}. Make sure the backend is running and VITE_API_ROOT is correct.`,
				{ url },
			);
		}

		throw new ApiClientError(
			"UNKNOWN",
			"Something went wrong while contacting TranscriptKeeper.",
			{ url },
		);
	}
};
