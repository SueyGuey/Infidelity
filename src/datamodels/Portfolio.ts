import { ChangingNumber, JSONData } from "./misc";

export default interface Portfolio {
	portfolioId: string;
	name: string;
	username: string;
	assets: Set<Asset>;
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
};

export type Tradeable = {
	symbol: string;
	currentPrice: ChangingNumber;
	// priceHistory: ChangingNumber[];
};

export type Stock = Tradeable & {
	company: Company;
	volume: ChangingNumber;
}

export type Company = {
	name: string;
	description: string;
	weburl: string;
	industry: string;
}

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