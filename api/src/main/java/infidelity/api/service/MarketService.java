package infidelity.api.service;

import infidelity.api.data.repository.StockRepository;
import infidelity.api.stockdata.FinnHub;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class MarketService {

    @Autowired
    private StockRepository stockRepository;

    private final static FinnHub fh = new FinnHub();

    public double getCurrentPrice(String symbol) {
        fh.doThing(symbol);

        if (!fh.hasData(symbol)) {
            fh.subscribe(symbol);
        }
        // Busy waiting loop
        // TODO: find a better solution using callbacks
        while (!fh.hasData(symbol)) {
            try {
                Thread.sleep(100);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        return fh.getInfo(symbol).getPrice();
    }

    /**
     *
     */
    public void populateCompanyInfo() {
        fh.listExchange();
    }
}
