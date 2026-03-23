import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Transcript } from "@/types/transcript";
import { DOWNLOAD_URL } from "@/config/constants";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

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

export const openDownloadUrl = () => {
	window.open(DOWNLOAD_URL, "_blank");
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
