/**
 * Watchlist.ts
 * Contains the data model for Watchlist as well as adding to that watchlist
 */

import { JSONData } from './misc';
import { Tradeable } from './Portfolio';

export default interface Watchlist {
	watchlistId: string;
	name: string;
	items: Set<Tradeable>;
}

export function watchlistToJson(watchlist: Watchlist): JSONData<Watchlist> {
	return {
		...watchlist,
		items: Array.from(watchlist.items),
	};
}

export function jsonToWatchlist(watchlist: JSONData<Watchlist>): Watchlist {
	return {
		...watchlist,
		items: new Set(watchlist.items),
	};
}
