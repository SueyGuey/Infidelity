package infidelity.api.data;

import lombok.Getter;

/**
 * PortfolioRequest represents a request for creating a portfolio by the user.
 * These objects are passed as a JSON object to the API by the frontend,
 * and hold all the information needed to create a new portfolio, including the user's specifications.
 * @see infidelity.api.controller.PortfolioController#createPortfolio(infidelity.api.data.PortfolioRequest)
 * @see infidelity.api.service.PortfolioService#createPortfolio(infidelity.api.data.PortfolioRequest)
 */
@Getter
public class WatchlistRequest {
    private String username;
    private String watchlistName;
}