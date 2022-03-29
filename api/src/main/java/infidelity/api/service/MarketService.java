package infidelity.api.service;

import infidelity.api.data.*;
import infidelity.api.data.repository.CompanyRepository;
import infidelity.api.data.repository.StockRepository;
import infidelity.api.stockdata.FinnHub;
import lombok.extern.slf4j.Slf4j;
import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static infidelity.api.utils.PropertyUtils.updateProperty;

@Service
@Slf4j
public class MarketService {

    @Autowired
    private StockRepository stockRepository;
    @Autowired
    private CompanyRepository companyRepository;

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
     * update general market information, the function only to be called
     * once per day or triggered manually.
     * populate company information
     */
    public void updateMarket() {
        listSymbols().forEach(this::updateInfo);
    }

    public Optional<Tradeable> findInfo(String symbol) {
        return stockRepository.findById(symbol);
    }

    public ChangingNumber getPrice(Tradeable item) {
        // TODO: update the price
        return item.getCurrentPrice();
    }

    public List<Tradeable> searchMarket(String query) {
        return stockRepository.findAll();
    }

    /**
     * Fetches a list of all ticker symbols in the stock market
     */
    private List<String> listSymbols() {
        fh.listExchange();
        return List.of(new String[]{"AAPLL", "FLLLL", "MSFTL", "TSLAL", "GMLLLL"});
    }

    /**
     * TODO: handle crypto use case
     * @param symbol ticker symbol for stock or id of cryptocurrency
     * @return Updated Tradeable object
     */
    private Tradeable updateInfo(String symbol) {
        Optional<Tradeable> existing = stockRepository.findById(symbol);
        if (existing.isPresent()) {
            Tradeable old = existing.get();
            if (old instanceof Stock stock) {
                updateProperty(stock, Stock::getCompany, stock::setCompany,
                        companyRepository.save(Company.builder()
                                .name(String.format("Company-%s", symbol))
                                .build()));
                return stockRepository.save(stock);
            }
            return old;
        } else {
            Company company = Company.builder()
                    .name(String.format("Company-%s", symbol))
                    .build();
            companyRepository.save(company);
            Stock stock = Stock.builder()
                    .symbol(symbol)
                    .company(company)
                    .build();
            return stockRepository.save(stock);
        }
    }
}
