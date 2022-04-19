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
    public Optional<ChangingNumber> getCurrentPrice(String symbol, int window, int timeout) {
        subscribe(symbol);
        Optional<ChangingNumber> dbPrice = changingNumberRepository.findById(symbol + "_price");
        if (dbPrice.isPresent() && dbPrice.get().upToDate(window)) {
            return dbPrice;
        } else {
            try {
                FHPriceMessage.PriceMessage message = fh.waitForPrice(symbol, timeout);
                Optional<Tradeable> tradeable = stockRepository.findById(symbol);
                return tradeable.map(value -> {
                    ChangingNumber price = value.updatePrice(message.getPrice(), message.getTimestamp());
                    stockRepository.save(value);
                    return price;
                });
            } catch (RuntimeException e) {
                log.warn("Failed to retrieve price for {}", symbol);
            }
        }
        return Optional.empty();
    }

    /**
     * update general market information, the function only to be called
     * once per day or triggered manually.
     * populate company information
     */
    public void updateMarket() {
        cleanUp();
        fh.addMessageHandler(this::handlePriceMessage);
        List<String> symbols = fh.listExchange();
        for (String symbol : symbols) {
            updateOrCreateDBInfo(symbol);
        }
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
        List.of(response.getResult()).forEach(result -> {
            String symbol = result.getSymbol();
            if (!symbol.contains(".")) {
                subscribe(symbol);
                Optional<Tradeable> tradeable = findInfo(symbol);
                if (tradeable.isEmpty()) {
                    Tradeable newItem = updateOrCreateDBInfo(symbol);
                    if (newItem != null) {
                        results.add(newItem);
                    }
                } else {
                    results.add(tradeable.get());
                }
            }
        });
        return results;
    }

    public Tradeable updateDBInfo(Tradeable tradeable) {
        if (tradeable instanceof Stock) {
            Stock stock = (Stock) tradeable;
            stock.updateQuote(fh.getQuote(tradeable.getSymbol()));
            return stockRepository.save(stock);
        }
        return stockRepository.save(tradeable);
    }

    private Tradeable createDBInfo(String symbol) {
        // Create new Tradeable object and populate with information from FinnHub
        // TODO: determine type of Tradeable object to create
        if (!symbol.contains(".")) {
            Company company = fetchCompanyProfile(symbol);
            Stock.StockBuilder builder = Stock.builder()
                    .symbol(symbol)
                    .company(company);
            return stockRepository.save(builder.build());
        } else {
            // TODO: handle crypto use case
            return null;
        }
    }

    /**
     * TODO: handle crypto use case
     * Updates the database with the latest information for a Tradeable item.
     * @param symbol ticker symbol for stock or id of cryptocurrency
     * @return Updated Tradeable object
     */
    public Tradeable updateOrCreateDBInfo(String symbol) {
        Optional<Tradeable> existing = findInfo(symbol);
        if (existing.isPresent()) {
            return updateDBInfo(existing.get());
        } else {
            return createDBInfo(symbol);
        }
    }

    private Company fetchCompanyProfile(String symbol) {
        FHCompanyResponse fhCompany = fh.getCompanyProfile(symbol);
        // TODO: handle null response
        if (fhCompany == null) {
            return null;
        }
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

    public List<Tradeable> getPopular(int limit) {
        return stockRepository.findTopByPopularity(limit);
    }

    public void addPopularity(String symbol) {
        Optional<Tradeable> tradeable = findInfo(symbol);
        if (tradeable.isPresent()) {
            Tradeable t = tradeable.get();
            double current = t.getPopularity();
            t.setPopularity(current + 1);
            stockRepository.save(t);
        }
    }

    public void handlePriceMessage(FHPriceMessage.PriceMessage message) {
        Optional<Tradeable> tradeable = stockRepository.findById(message.getSymbol());
        tradeable.ifPresent(value -> {
            value.updatePrice(message.getPrice(), message.getTimestamp());
            stockRepository.save(tradeable.get());
        });
    }

    public void cleanUp() {
        stockRepository.findAll().forEach(stock -> {
            if (stock.getSymbol().contains(".")) {
                stockRepository.delete(stock);
            }
        });
    }

    public Stock getQuote(Stock stock) {
        stock.updateQuote(fh.getQuote(stock.getSymbol()));
        return stockRepository.save(stock);
    }
}
