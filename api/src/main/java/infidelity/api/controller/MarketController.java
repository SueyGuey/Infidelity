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
import java.util.Optional;

/**
 * Endpoint for stock market data
 */
@RestController
@RequestMapping(path = "/market")
@Slf4j
public class MarketController {

    @Autowired
    private MarketService market;

    @GetMapping("/info/{symbol}")
    public ResponseEntity<String> getInfo(@PathVariable String symbol) {
        log.info("GET /market/info/{}", symbol);
        Gson gson = new GsonBuilder()
                .registerTypeAdapterFactory(HibernateProxyTypeAdapter.FACTORY)
                .create();
        Tradeable item = market.getInfo(symbol);
        return new ResponseEntity<>(gson.toJson(item), HttpStatus.OK);
    }

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
