package infidelity.api.controller;


import infidelity.api.service.MarketService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
        return market.getCurrentPrice(symbol);
    }
}
