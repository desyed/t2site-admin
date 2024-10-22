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
