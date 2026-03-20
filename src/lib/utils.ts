import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Transcript } from "@/types/transcript";
import { DOWNLOAD_URL } from "@/config/constants";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const makeStringToArray = (text: string, key: string) => {
	const result: Transcript[] = [];

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
