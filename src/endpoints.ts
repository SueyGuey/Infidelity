import { NewUserInfo } from "./datamodels/User";

enum Backend {
	Local = 'http://localhost:8080',
	Production = '',
}

const BACKEND_URL = Backend.Local;

export const GET_USER_URL = (userId: string): string => `${BACKEND_URL}/user/${userId}`;
export const CREATE_USER_URL = `${BACKEND_URL}/user/create`;
export const EDIT_USER_URL = `${BACKEND_URL}/user/update`;

export const STOCK_PRICE_URL = (symbol: string): string => `${BACKEND_URL}/market/price/${symbol}`;

export async function stockPrice(symbol: string): Promise<number> {
	return await (await fetch(STOCK_PRICE_URL(symbol))).json();
}

export function createUserBackend(user: NewUserInfo) {
	console.log("CREATING USER");
	fetch(CREATE_USER_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(user),
	})
}