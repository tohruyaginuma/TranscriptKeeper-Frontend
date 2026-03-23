import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Transcript } from "@/types/transcript";
import {
	DESKTOP_LATEST_RELEASE_API_URL,
	DESKTOP_RELEASES_URL,
} from "@/config/constants";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

type GitHubReleaseAsset = {
	name: string;
	browser_download_url: string;
};

type GitHubLatestReleaseResponse = {
	assets: GitHubReleaseAsset[];
};

export const makeStringToArray = (text: string, key: string) => {
	const result: Transcript[] = [];

	if (!text) {
		return result;
	}

	for (const line of text.split(key)) {
		const index = result.length + 1;
		const trimmedText = `${line.trim()}`;

		if (trimmedText === "") {
			continue;
		}

		result.push({
			id: index,
			text: `${trimmedText}.`,
		});
	}

	return result;
};

export const getLatestDmgDownloadUrl = async () => {
	const response = await fetch(DESKTOP_LATEST_RELEASE_API_URL, {
		headers: {
			Accept: "application/vnd.github+json",
		},
	});

	if (!response.ok) {
		throw new Error("Failed to fetch the latest desktop release.");
	}

	const release =
		(await response.json()) as GitHubLatestReleaseResponse;
	const dmgAsset = release.assets.find((asset) =>
		asset.name.toLowerCase().endsWith(".dmg"),
	);

	if (!dmgAsset) {
		throw new Error("No macOS installer was found in the latest release.");
	}

	return dmgAsset.browser_download_url;
};

export const openDownloadUrl = async () => {
	try {
		const downloadUrl = await getLatestDmgDownloadUrl();
		window.location.assign(downloadUrl);
	} catch {
		window.open(DESKTOP_RELEASES_URL, "_blank", "noopener,noreferrer");
	}
};

export const copyTextToClipboard = async (text: string) => {
	if (navigator.clipboard?.writeText) {
		await navigator.clipboard.writeText(text);
		return;
	}

	const textArea = document.createElement("textarea");
	textArea.value = text;
	textArea.setAttribute("readonly", "");
	textArea.style.position = "absolute";
	textArea.style.left = "-9999px";

	document.body.appendChild(textArea);
	textArea.select();

	try {
		document.execCommand("copy");
	} finally {
		document.body.removeChild(textArea);
	}
};
