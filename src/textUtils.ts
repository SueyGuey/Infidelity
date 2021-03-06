/**
 * textUtils.ts
 * Checks for email and password validness
 */

const EMAIL_REGEX =
	// eslint-disable-next-line no-useless-escape
	/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/;
export const MIN_PASSWORD_LENGTH = 8;

export function validateEmail(email: string): boolean {
	return EMAIL_REGEX.test(String(email).toLowerCase());
}

export function validatePassword(password: string): boolean {
	return password.length >= MIN_PASSWORD_LENGTH && PASSWORD_REGEX.test(password);
}
