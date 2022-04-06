import { PortfolioRequest, TransactionRequest } from './datamodels/Portfolio';
import { NewUserInfo } from './datamodels/User';

enum Backend {
	Local = 'http://localhost:8080',
	Production = 'https://api.infidelity.trade',
}

const BACKEND_URL = Backend.Production;

export const GET_USER_URL = (userId: string): string => `${BACKEND_URL}/user/${userId}`;
export const CREATE_USER_URL = `${BACKEND_URL}/user/create`;
export const EDIT_USER_URL = `${BACKEND_URL}/user/update`;
export const GET_TRADEABLE_URL = (symbol: string): string => `${BACKEND_URL}/market/info/${symbol}`;
export const SEARCH_MARKET_URL = (query: string): string => `${BACKEND_URL}/market/search/${query}`;

export const STOCK_PRICE_URL = (symbol: string): string => `${BACKEND_URL}/market/price/${symbol}`;

export const MAKE_TRADE_URL = `${BACKEND_URL}/user/portfolio/trade`;
export const NEW_PORTFOLIO_URL = `${BACKEND_URL}/user/portfolio/create`;

export async function stockPrice(symbol: string): Promise<number> {
	return await (await fetch(STOCK_PRICE_URL(symbol))).json();
}

export function createUserBackend(user: NewUserInfo) {
	console.log('CREATING USER');
	fetch(CREATE_USER_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(user),
	});
}

export async function getTradeableBackend(symbol: string) {
	console.log('GET TRADEABLE');
	return await fetch(GET_TRADEABLE_URL(symbol)).then((res) => res.json());
}

export async function searchMarketBackend(query: string) {
	console.log('SEARCH MARKET');
	return await fetch(SEARCH_MARKET_URL(query)).then((res) => res.json());
}

export function makeTradeBackend(trade: TransactionRequest) {
	console.log('MAKE TRADE');
	fetch(MAKE_TRADE_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(trade),
	});
}

export function newPortfolioBackend(portfolio: PortfolioRequest) {
	console.log('NEW PORTFOLIO');
	fetch(NEW_PORTFOLIO_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(portfolio),
	});
}
