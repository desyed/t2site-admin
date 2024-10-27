import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export async function delay(duration: number) {
	return new Promise((resolve, reject) => {
		if (!duration || Number.isNaN(duration)) {
			reject("Invalid Duration parameter");
		}
		setTimeout(() => {
			resolve(duration);
		}, duration);
	});
}

/**
 * Extracts up to two initials from a full name.
 * @param name - The full name to extract initials from.
 * @returns A string containing up to two initials, or an empty string if no valid initials are found.
 */
export function getNameInitials(name: string): string {
	return name
		.split(" ")
		.map((part) => part.at(0))
		.filter(Boolean) // Remove any undefined values if only one name exists
		.slice(0, 2) // Take only the first two initials
		.join("");
}

export function getQuery(key: string) {
	const url = new URL(window.location.href);
	return url.searchParams.get(key);
}
