/**
 * endpoints.ts
 * This is the endpoint which connects the backend to the frontend.
 */

import { ChangingNumber } from './datamodels/misc';
import Portfolio, {
	PortfolioRequest,
	Tradeable,
	Transaction,
	TransactionRequest,
} from './datamodels/Portfolio';
import { NewUserInfo } from './datamodels/User';

//For switching between local and production backend
enum Backend {
	Local = 'http://localhost:8080',
	Production = 'https://api.infidelity.trade',
}

//change .Production for production, .Local for local
const BACKEND_URL = Backend.Production;

//URLs of certain pages
export const GET_USER_URL = (userId: string): string => `${BACKEND_URL}/user/${userId}`;
export const CREATE_USER_URL = `${BACKEND_URL}/user/create`;
export const EDIT_USER_URL = `${BACKEND_URL}/user/update`;
export const GET_TRADEABLE_URL = (symbol: string): string => `${BACKEND_URL}/market/info/${symbol}`;
export const SEARCH_MARKET_URL = (query: string): string => `${BACKEND_URL}/market/search/${query}`;
export const STOCK_PRICE_URL = (symbol: string, window: number, timeout: number): string =>
	`${BACKEND_URL}/market/price/${symbol}?window=${window}&timeout=${timeout}`;
export const POPULAR_STOCKS_URL = `${BACKEND_URL}/market/popular`;

export const MAKE_TRADE_URL = `${BACKEND_URL}/user/portfolio/trade`;
export const NEW_PORTFOLIO_URL = `${BACKEND_URL}/user/portfolio/create`;

export const NEW_WATCHLIST_URL = `${BACKEND_URL}/user/addWL`;

export const DEFUALT_PRICE_WINDOW = 1000 * 60 * 60 * 1; // 1 hour
export const DEFAULT_PRICE_TIMEOUT = 1000 * 60 * 1; // 1 minute

//User creation
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

//Fetching a tradeable
export async function getTradeableBackend(symbol: string): Promise<Tradeable> {
	console.log('GET TRADEABLE');
	return await fetch(GET_TRADEABLE_URL(symbol)).then((res) => res.json());
}

//Fetching price of a tradeable
export async function priceBackend(
	symbol: string,
	window: number,
	timeout: number
): Promise<ChangingNumber> {
	console.log(`GET PRICE OF ${symbol}`);
	return await fetch(STOCK_PRICE_URL(symbol, window, timeout)).then((res) => res.json());
}

//The search functionality
export async function searchMarketBackend(query: string): Promise<Tradeable[]> {
	console.log('SEARCH MARKET');
	return await fetch(SEARCH_MARKET_URL(query)).then((res) => res.json());
}

//For performing trades
export async function makeTradeBackend(trade: TransactionRequest): Promise<Transaction> {
	console.log('MAKE TRADE');
	return await fetch(MAKE_TRADE_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(trade),
	}).then((res) => res.json());
}

//For creating new portfolios for the user
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

export function newWatchlist(watchlistName: string, username: string) {
	console.log('NEW WATCHLIST');
	fetch(NEW_WATCHLIST_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(watchlistName),
	});
}

export function setActivePortfolioBackend(username: string, porfolioName: string) {
	console.log('SET ACTIVE PORTFOLIO');
	fetch(
		`${BACKEND_URL}/user/portfolio/set-active?username=${username}?portfolioName=${porfolioName}`,
		{
			method: 'PUT',
		}
	);
}

export function loadPortfolioBackend(username: string, portfolioName: string): Promise<Portfolio> {
	console.log('GET PORTFOLIO');
	return fetch(
		`${BACKEND_URL}/user/portfolio?username=${username}&portfolioName=${portfolioName}`
	).then((res) => res.json());
}
