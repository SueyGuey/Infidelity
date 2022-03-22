import { NewUserInfo } from "./datamodels/User";

enum Backend {
	Local = 'http://localhost:8080/api',
}

const BACKEND_URL = Backend.Local;

export const GET_USER_URL = (userId: string): string => `${BACKEND_URL}/user/${userId}`;
export const EDIT_USER_URL = `${BACKEND_URL}/user/update`;

export const STOCK_PRICE_URL = (symbol: string): string => `${BACKEND_URL}/market/price/${symbol}`;

export async function stockPrice(symbol: string): Promise<number> {
	return await (await fetch(STOCK_PRICE_URL(symbol))).json();
}

export function createUser(user: NewUserInfo) {
	;
}