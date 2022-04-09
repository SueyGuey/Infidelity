package infidelity.api.service;

import infidelity.api.data.ChangingNumber;
import infidelity.api.data.Company;
import infidelity.api.data.Stock;
import infidelity.api.data.Tradeable;
import infidelity.api.data.repository.ChangingNumberRepository;
import infidelity.api.data.repository.CompanyRepository;
import infidelity.api.data.repository.StockRepository;
import infidelity.api.stockdata.FinnHub;
import infidelity.api.stockdata.decode.FHCompanyResponse;
import infidelity.api.stockdata.decode.FHPriceMessage;
import infidelity.api.stockdata.decode.FHSearchResponse;
import lombok.extern.slf4j.Slf4j;
import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * Service for performing functions related to market data. Performs operations on existing data,
 * populates the database with new data, and retrieves and updates current prices.
 * Acts as an all-in-one wrapper for stock data APIs.
 */
@Service
@Slf4j
public class MarketService {

    @Autowired
    private StockRepository stockRepository;
    @Autowired
    private CompanyRepository companyRepository;
    @Autowired
    private ChangingNumberRepository changingNumberRepository;
    @Autowired
    private FinnHub fh;

    /**
     * Uses FinnHub to retrieve the latest price of any Tradeable item - stocks, ETFs, cryptocurrencies
     * @param symbol Identifying symbol of the Tradeable item.
     * @return ChangingNumber representing the timestamp and price of the latest price update.
     * @see Tradeable#symbol
     */
    public ChangingNumber getCurrentPrice(String symbol) {
         FHPriceMessage.PriceMessage message = fh.getPrice(symbol);
         long now = DateTime.now().getMillis();
         System.out.println(now + "\n" + message.getTimestamp());
         if (now - message.getTimestamp() > 5000) {
             message = fh.fetchPrice(symbol);
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
        fh.listExchange().forEach(this::updateInfo);
    }

    /**
     * Retrieves a Tradeable object from the database where is it not certain whether the record
     * exists or not for the specified symbol.
     * @param symbol Identifying symbol of the Tradeable item.
     * @return Optional Tradeable object as represented by the database record.
     * @see Tradeable
     */
    public Optional<Tradeable> findInfo(String symbol) {
        return stockRepository.findById(symbol);
    }

    /**
     * TODO: implement this function and add "popularity" field to Tradeable to help sort results
     * Provides a list of Tradeable options from a user's search query.
     * @param query user-specified query, could be anything: company name, ticker symbol, industry,
     *              even an incomplete or random string.
     * @return A list of Tradeable objects from the market representing Stocks, Cryptocurrencies, and ETFs
     * in the order of most-to-least likely to match the query
     */
    public List<Tradeable> searchMarket(String query) {
        List<Tradeable> results = new ArrayList<>();
        FHSearchResponse response = fh.search(query);
        if (response == null) {
            return results;
        }
        System.out.println(response);
        List.of(response.getResults()).forEach(result -> {
            Optional<Tradeable> tradeable = findInfo(result.getSymbol());
            tradeable.ifPresent(results::add);
        });
        return results;
    }

    /**
     * TODO: handle crypto use case
     * Updates the database with the latest information for a Tradeable item.
     * @param symbol ticker symbol for stock or id of cryptocurrency
     * @return Updated Tradeable object
     */
    private Tradeable updateInfo(String symbol) {
        Optional<Tradeable> existing = findInfo(symbol);
        if (existing.isPresent()) {
            Tradeable tradeable = existing.get();
            FHPriceMessage.PriceMessage message = fh.getPrice(symbol);
            tradeable.updatePrice(message.getPrice(), message.getTimestamp());
            Company company = fetchCompanyProfile(symbol);
            return stockRepository.save(tradeable);
        } else {
            // TODO: handle crypto use case
            // Create new Tradeable object and populate with information from FinnHub
            Company company = fetchCompanyProfile(symbol);
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

    private Company fetchCompanyProfile(String symbol) {
        FHCompanyResponse fhCompany = fh.getCompanyProfile(symbol);
        // TODO: handle null response
        Company company = Company.builder()
                .name(fhCompany.getName())
                .industry(fhCompany.getFinnhubIndustry())
                .weburl(fhCompany.getWeburl())
                .country(fhCompany.getCountry())
                .build();
        return companyRepository.save(company);
    }

    public void subscribe(String symbol) {
        fh.subscribe(symbol);
    }
}
