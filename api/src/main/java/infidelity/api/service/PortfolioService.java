package infidelity.api.service;

import infidelity.api.data.*;
import infidelity.api.data.repository.AssetRepository;
import infidelity.api.data.repository.ChangingNumberRepository;
import infidelity.api.data.repository.PortfolioRepository;
import infidelity.api.data.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.OptionalLong;
import java.util.Set;

/**
 * Service for portfolio management. Responsible for creating, updating and deleting portfolios.
 * This includes handling transactions and updating the portfolio's value, as well as calculating
 * the portfolio's performance metrics over time.
 */
@Service
public class PortfolioService {
    @Autowired
    private UserService userService;
    @Autowired
    private MarketService marketService;

    @Autowired
    private TransactionRepository transactionRepository;
    @Autowired
    private PortfolioRepository portfolioRepository;
    @Autowired
    private AssetRepository assetRepository;
    @Autowired
    private ChangingNumberRepository changingNumberRepository;

    public void setActivePortfolio(String username, String portfolioName){
        User user = userService.getUserById(username);
        Optional<Portfolio> portfolio = user.getPortfolios().stream().filter(p -> p.getName().equals(portfolioName)).findFirst();
        if(portfolio.isPresent()){
            user.setActivePortfolio(portfolio.get().getName());
            userService.saveUser(user);
        }
    }

    /**
     * TODO: implement this function
     * Creates a new portfolio and adds it to the specified user's set of portfolios.
     * @param newPortfolio A PortfolioRequest object containing information about how the new portfolio
     *                     should be made to the user's specifications
     * @return The newly created Portfolio object as it is represented in the database.
     * @see PortfolioRequest
     */
    public Portfolio createPortfolio(PortfolioRequest newPortfolio){
        Portfolio portfolio = Portfolio.builder()
                .name(newPortfolio.getPortfolioName())
                .balance(newPortfolio.getAccountBalance())
                .build();
        portfolio = portfolioRepository.save(portfolio);
        User user = userService.getUserById(newPortfolio.getUsername());
        user.getPortfolios().add(portfolio);
        userService.saveUser(user);
        return portfolio;
    };

    /**
     * TODO: implement function
     * Retrieves an existing Portfolio object from a User in the database.
     * Requires that the user and corresponding portfolio exists.
     * @param username Username of the user the portfolio belongs to
     * @param portfolioName Name of the portfolio
     * @return The Portfolio as represented in the database
     * @see Portfolio
     */
    public Portfolio getPortfolio(String username, String portfolioName){
        User user = userService.getUserById(username);
        Optional<Portfolio> portfolio = user.getPortfolios().stream().filter(p -> p.getName().equals(portfolioName)).findFirst();
        if (portfolio.isPresent()){
            return updatePortfolioValue(portfolio.get());
        } else {
            throw new IllegalArgumentException(
                    String.format("Portfolio %s does not exist for user %s", portfolioName, username));
        }
    };

    /**
     * TODO: implement function
     * Removes the named portfolio from the named user.
     * Requires that the user and portfolio exist, and that the portfolio is not the last portfolio in the
     * user's set of portfolios.
     * @param username Username of the user the portfolio belongs to
     * @param portfolioName Name of the portfolio
     * @return Whether the portfolio has in fact been deleted.
     */
    public boolean deletePortfolio(String username, String portfolioName){
        return true;
    };

    /**
     * Makes a purchase of the specified number of shares of the specified stock or cryptocurrency
     * in the specified portfolio, and updates the portfolio's history accordingly.
     * @param request A PurchaseRequest object containing information about how the purchase should be made
     * @return A Transaction object representing the purchase details
     */
    public Transaction makeTransaction(TransactionRequest request){
        Portfolio userPortfolio = getPortfolio(request.getUsername(), request.getPortfolioName());
        // make changes to portfolio
        Optional<Tradeable> tradeable = marketService.findInfo(request.getItemSymbol());
        if (tradeable.isPresent()){
            Optional<ChangingNumber> price = marketService.getCurrentPrice(request.getItemSymbol(), 1000000, 60000);
            if (price.isEmpty()) {
                throw new RuntimeException("Could not find price for " + request.getItemSymbol());
            }

            Transaction transaction = Transaction.builder()
                    .item(tradeable.get())
                    .price(price.get().value)
                    .quantity(request.getQuantity())
                    .timestamp(request.getTimestamp())
                    .build();
            transaction = transactionRepository.save(transaction);

            // Update portfolio
            userPortfolio.setBalance(userPortfolio.getBalance()
                     - transaction.getQuantity() * transaction.getPrice());
            userPortfolio.getTransactions().add(transaction);

            Set<Asset> assets = userPortfolio.getAssets();
            // checks if the tradeable is already owned in the portfolio
            Asset asset = null;
            Optional<Asset> optAsset = assets.stream().filter(a ->
                    a.getItem().getSymbol().equals(tradeable.get().getSymbol())
            ).findFirst();
            if (optAsset.isPresent()) {
                asset = optAsset.get();
                asset.add(request.getQuantity());
                assetRepository.save(asset);
            } else {
                asset = new Asset(tradeable.get(), request.getQuantity());
                changingNumberRepository.save(asset.getValue());
                userPortfolio.getAssets().add(asset);
                assetRepository.save(asset);
                portfolioRepository.save(userPortfolio);
            }
            return transaction;
        }
        return null;
    };

    public Portfolio updatePortfolioValue(Portfolio portfolio){
        // update values of all assets
        portfolio.getAssets().forEach(asset -> {
            Optional<ChangingNumber> price = marketService.getCurrentPrice(asset.getItem().getSymbol(),
                    1000 * 60 * 120, 60000); // TODO: change window size
            if (price.isPresent()) {
                double newValue = price.get().value * asset.getQuantity();
                long lastUpdated = price.get().lastUpdated;
                if (asset.getValue() == null) {
                    asset.setValue(ChangingNumber.builder()
                            .numberId(asset.getAssetId() + "_asset_value")
                            .value(newValue)
                            .lastUpdated(lastUpdated)
                            .build());
                } else {
                    asset.getValue().update(newValue, lastUpdated);
                }
                assetRepository.save(asset);
            }
        });
        // calculate the sum of all asset values in the portfolio
        double sum = portfolio.getAssets().stream()
                .mapToDouble(asset -> asset.getValue().getValue())
                .sum() + portfolio.getBalance();
        OptionalLong optLastUpdated = portfolio.getAssets().stream()
                .mapToLong(asset -> asset.getValue().getLastUpdated())
                .min();
        long lastUpdated = optLastUpdated.orElseGet(System::currentTimeMillis);
        if (portfolio.getTotalValue() == null) {
            portfolio.setTotalValue(ChangingNumber.builder()
                    .numberId(portfolio.getPortfolioId() + "_asset_value")
                    .value(sum)
                    .lastUpdated(lastUpdated)
                    .build());
        } else {
            portfolio.getTotalValue().update(sum, lastUpdated);
        }
        return portfolioRepository.save(portfolio);
    }

    /**
     * TODO: implement function
     * Uses a list of Transaction objects to calculate the total value of the portfolio
     * at various points in time. Makes use of the current market price of the stock or cryptocurrency
     * to calculate the value of the portfolio at each point in time.
     * @param portfolio The portfolio to calculate the value of
     */
    public void updateHistory(Portfolio portfolio){
        return;
    };
}
