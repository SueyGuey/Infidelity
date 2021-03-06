package infidelity.api.controller;


import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import infidelity.api.data.ChangingNumber;
import infidelity.api.data.Tradeable;
import infidelity.api.data.model.HibernateProxyTypeAdapter;
import infidelity.api.service.MarketService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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
    public ResponseEntity<Tradeable> getInfo(@PathVariable String symbol) {
        log.info("GET /market/info/{}", symbol);
        Gson gson = new GsonBuilder()
                .registerTypeAdapterFactory(HibernateProxyTypeAdapter.FACTORY)
                .create();
        Optional<Tradeable> optItem = market.findInfo(symbol);
        if (optItem.isPresent()) {
            Tradeable item = market.updateOrCreateDBInfo(optItem.get().getSymbol());
            market.addPopularity(symbol);
            return new ResponseEntity<>(item, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/price/{symbol}")
    public ResponseEntity<ChangingNumber> getPrice(@PathVariable String symbol,
                                                   @RequestParam(required = false) Integer timeout,
                                                   @RequestParam(required = false) Integer window) {
        log.info("GET /market/price/{}", symbol);
        if (timeout == null) {
            timeout = 0;
        }
        if (window == null) {
            window = -1;
        }
        Optional<ChangingNumber> price = market.getCurrentPrice(symbol, window, timeout);
        return price.map(ResponseEntity::ok).orElseGet(() -> new ResponseEntity<>(HttpStatus.NO_CONTENT));
    }

    /**
     * Search the database for a list of tradeable entities that match the search query
     * @param query Search query from the frontend - user generated
     * @return JSON string of the list of tradeable entities in the format of Tradeable
     */
    @GetMapping("/search/{query}")
    public ResponseEntity<List<Tradeable>> search(@PathVariable String query) {
        log.info("GET /market/search/{}", query);
        Gson gson = new GsonBuilder()
                .registerTypeAdapterFactory(HibernateProxyTypeAdapter.FACTORY)
                .create();
        List<Tradeable> results = market.searchMarket(query);
        if (results.size() > 0) {
            market.addPopularity(results.get(0).getSymbol());
        }
        return new ResponseEntity<>(results, HttpStatus.OK);
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

    @PutMapping("/subscribe/{symbol}")
    public void subscribe(@PathVariable String symbol) {
        market.subscribe(symbol);
    }

    @GetMapping("/popular")
    public ResponseEntity<List<Tradeable>> getPopular(@RequestParam(required = false) Integer limit) {
        log.info("GET /market/popular");
        if (limit == null) {
            limit = 100;
        }
        return ResponseEntity.ok(market.getPopular(limit));
    }
}
