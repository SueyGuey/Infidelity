package infidelity.api.data;

import lombok.Getter;

import java.util.List;

/**
 * Request for adding a tradeable to a watchlist
 * @TODO Change list to set
 */
@Getter
public class AddToWatchlistRequest {
    private String username;
    private String watchlistNames[];
    private String symbol;
}
