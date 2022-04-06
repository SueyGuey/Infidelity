package infidelity.api.service;

import infidelity.api.data.ChangingNumber;
import infidelity.api.data.Company;
import infidelity.api.data.Stock;
import infidelity.api.data.Tradeable;
import infidelity.api.data.repository.CompanyRepository;
import infidelity.api.data.repository.StockRepository;
import infidelity.api.stockdata.FinnHub;
import infidelity.api.stockdata.FinnHubMessage;
import lombok.extern.slf4j.Slf4j;
import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class MarketService {

    @Autowired
    private StockRepository stockRepository;
    @Autowired
    private CompanyRepository companyRepository;
    @Autowired
    private ChangingNumberRepository changingNumberRepository;

    private final static FinnHub fh = new FinnHub();

    public ChangingNumber getCurrentPrice(String symbol) {
         FinnHubMessage.PriceMessage message = fh.getInfo(symbol);
         long now = DateTime.now().getMillis();
         if (now - message.getTimestamp() > 5000) {
             message = fh.fetchInfo(symbol);
         }
         return ChangingNumber.builder()
                 .value(message.getPrice())
                 .lastUpdated(message.getTimestamp())
                 .build();
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

    public Tradeable getInfo(String symbol) {
        return updateInfo(symbol);
    }

    public List<Tradeable> searchMarket(String query) {
        stockRepository.deleteAll();
        updateMarket();
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
            Tradeable tradeable = existing.get();
            ChangingNumber price = getCurrentPrice(tradeable.getSymbol());
            if (tradeable.getCurrentPrice().update(price.value, price.lastUpdated));
            return stockRepository.save(tradeable);
        } else {
            Company company = Company.builder()
                    .name(String.format("Company-%s", symbol))
                    .build();
            companyRepository.save(company);
            ChangingNumber price = getCurrentPrice(symbol);
            changingNumberRepository.save(price);
            Stock stock = Stock.builder()
                    .symbol(symbol)
                    .company(company)
                    .price(price)
                    .build();
            return stockRepository.save(stock);
        }
    }
}
