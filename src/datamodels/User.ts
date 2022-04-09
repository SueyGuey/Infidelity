/**
 * User.ts
 * Contains the datamodel for the user and the personalized data such as portfolio and watchlist
 */

import { JSONData } from './misc';
import Portfolio from './Portfolio';
import { jsonToPortfolio, portfolioToJson } from './Portfolio';
import Watchlist, { jsonToWatchlist, watchlistToJson } from './Watchlist';

export default interface User {
	username: string;
	email: string;
	portfolios: Set<Portfolio>;
	watchlists: Set<Watchlist>;
}

export function userToJson(user: User): JSONData<User> {
	return {
		...user,
		portfolios: Array.from(user.portfolios).map(portfolioToJson),
		watchlists: Array.from(user.watchlists).map(watchlistToJson),
	};
}

export function jsonToUser(data: JSONData<User>): User {
	return {
		...data,
		portfolios: new Set(data.portfolios.map(jsonToPortfolio)),
		watchlists: new Set(data.watchlists.map(jsonToWatchlist)),
	};
}

export type NewUserInfo = {
	username: string;
	email: string;
};
