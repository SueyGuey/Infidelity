/**
 * Portfolio.ts
 * Contains all data models for items in the portfolio
 * All of these data models map to classes of identical names in Java
 */

import { ChangingNumber, JSONData } from './misc';

export default interface Portfolio {
	portfolioId: string;
	name: string;
	balance: number;
	totalValue: ChangingNumber;
	assets: Set<Asset>;
	transactions: Transaction[];
}

export function portfolioToJson(portfolio: Portfolio): JSONData<Portfolio> {
	return {
		...portfolio,
		assets: Array.from(portfolio.assets),
	};
}

export function jsonToPortfolio(portfolio: JSONData<Portfolio>): Portfolio {
	return {
		...portfolio,
		assets: new Set(portfolio.assets),
	};
}

export type Asset = {
	assetId: string;
	item: Tradeable;
	quantity: number;
	value: ChangingNumber;
};

export interface Tradeable {
	symbol: string;
	currentPrice?: ChangingNumber;
	// priceHistory: ChangingNumber[];
}

export interface Stock extends Tradeable {
	company: Company;
	volume: ChangingNumber;
	dayChange: number;
	dayChangePercent: number;
	dayHigh: number;
	dayLow: number;
	open: number;
	previousClose: number;
}

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
	item: Tradeable;
	price: number;
	quantity: number;
};

export function isStock(item: Tradeable): item is Stock {
	return 'company' in item;
}

export function getTotalStockValue(portfolio: Portfolio) {
	let total = 0;
	if (!portfolio.assets) {
		return total;
	}
	for (const asset of Array.from(portfolio.assets)) {
		if (isStock(asset.item)) {
			total += asset.value.value;
		}
	}
	return total;
}
