package infidelity.api.controller;


import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import infidelity.api.data.Tradeable;
import infidelity.api.data.model.HibernateProxyTypeAdapter;
import infidelity.api.service.MarketService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST api controller for stock market data, company information, stock and cryptocurrency
 * prices, and historical data requests from the frontend. This data is not protected by the same
 * authentication layer as /users/ endpoints, so users don't need to be logged in to see market information.
 * This allows us to display charts and prices for popular tickers on the landing page of the frontend.
 */
@RestController
@RequestMapping(path = "/market")
@Slf4j
public class MarketController {

    @Autowired
    private MarketService market;

    /**
     * Get information about a specific stock, cryptocurrency, or other tradeable entity
     * @param symbol Identifier for the tradeable entity
     * @return JSON string of the tradeable entity information in the format of Tradeable
     * @see Tradeable#symbol
     */
    @GetMapping("/info/{symbol}")
    public ResponseEntity<String> getInfo(@PathVariable String symbol) {
        log.info("GET /market/info/{}", symbol);
        Gson gson = new GsonBuilder()
                .registerTypeAdapterFactory(HibernateProxyTypeAdapter.FACTORY)
                .create();
        Tradeable item = market.getInfo(symbol);
        return new ResponseEntity<>(gson.toJson(item), HttpStatus.OK);
    }

    /**
     * Search the database for a list of tradeable entities that match the search query
     * @param query Search query from the frontend - user generated
     * @return JSON string of the list of tradeable entities in the format of Tradeable
     */
    @GetMapping("/search/{query}")
    public ResponseEntity<String> search(@PathVariable String query) {
        log.info("GET /market/search/{}", query);
        Gson gson = new GsonBuilder()
                .registerTypeAdapterFactory(HibernateProxyTypeAdapter.FACTORY)
                .create();
        List<Tradeable> results = market.searchMarket(query);
        return new ResponseEntity<>(gson.toJson(results), HttpStatus.OK);
    }

    /**
     * For populating Stock market information
     * Adds tickers and companies to the database
     * Updates outdated company information
     */
    @PutMapping("/updateInfo")
    public void updateInfo() {
        market.updateMarket();
    }
}
