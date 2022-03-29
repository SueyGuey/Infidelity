package infidelity.api.controller;


import infidelity.api.service.MarketService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * Endpoint for stock market data
 */
@RestController
@RequestMapping(path = "/market")
@Slf4j
public class MarketController {

    @Autowired
    private MarketService market;

    @GetMapping("/price/{symbol}")
    public double getPrice(@PathVariable String symbol) {
        log.info("GET /market/price/{}", symbol);
        return market.getCurrentPrice(symbol);
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
