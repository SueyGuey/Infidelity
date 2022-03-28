package infidelity.api.service;

import infidelity.api.data.ChangingNumber;
import infidelity.api.data.Tradeable;
import infidelity.api.data.repository.StockRepository;
import infidelity.api.stockdata.FinnHub;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

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

    public void updateMarket() {
        // update general market information, the function only to be called
        // once per day or triggered manually
        // populate company information
    }

    public Tradeable getInfo(String symbol) {
        return stockRepository.getById(symbol);
    }

    public ChangingNumber getPrice(Tradeable item) {
        // TODO: update the price
        return item.getCurrentPrice();
    }

    public List<Tradeable> searchMarket(String query) {
        return new ArrayList<>();
    }

    private List<String> listSymbols() {
        fh.listExchange();
        return new ArrayList<>();
    }
}
