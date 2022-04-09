/**
 * Portfolio.ts
 * Contains all data models for items in the portfolio
 * All of these data models map to classes of identical names in Java
 */

import { ChangingNumber, JSONData } from './misc';

export default interface Portfolio {
	portfolioId: string;
	name: string;
	assets: Set<Asset>;
	transactions: Set<Transaction>;
}

export function portfolioToJson(portfolio: Portfolio): JSONData<Portfolio> {
	return {
		...portfolio,
		assets: Array.from(portfolio.assets),
		transactions: Array.from(portfolio.transactions),
	};
}

export function jsonToPortfolio(portfolio: JSONData<Portfolio>): Portfolio {
	return {
		...portfolio,
		assets: new Set(portfolio.assets),
		transactions: new Set(portfolio.transactions),
	};
}

export type Asset = {
	assetId: string;
	itemSymbol: string;
	quantity: number;
};

export type Tradeable = {
	symbol: string;
	currentPrice: ChangingNumber;
	// priceHistory: ChangingNumber[];
};

export type Stock = Tradeable & {
	company: Company;
	volume: ChangingNumber;
};

export type Company = {
	name: string;
	description: string;
	weburl: string;
	industry: string;
};

export type PortfolioRequest = {
	username: string;
	name: string;
	accountBalance: number;
};

export type TransactionRequest = {
	username: string;
	itemSymbol: string;
	portfolioName: string;
	quantity: number;
	timestamp: number;
};

export type Transaction = {
	transactionId: string;
	timestamp: number;
	itemSymbol: string;
	price: number;
	quantity: number;
};
