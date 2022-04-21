package infidelity.api.data;

import lombok.Getter;

import java.util.Set;

/**
 * Request for adding a tradeable to a watchlist
 */
@Getter
public class AddToWatchlistRequest {
    private String username;
    private Set<String> watchlistNames;
    private String symbol;
}
