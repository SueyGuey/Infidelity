export function getTime(): number {
	return Date.now();
}

export function getTimeString(): string {
	return new Date().toISOString();
}

export function isRecent(time: number, window: number): boolean {
	return getTime() - time < window;
}

export const SECOND = 1000;
export const MINUTE = 60 * SECOND;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;
export const WEEK = 7 * DAY;
export const MONTH = 30 * DAY;
export const YEAR = 365 * DAY;
