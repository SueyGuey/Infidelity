package infidelity.api.service;

import infidelity.api.data.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
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

    /**
     * TODO: implement this function
     * Creates a new portfolio and adds it to the specified user's set of portfolios.
     * @param newPortfolio A PortfolioRequest object containing information about how the new portfolio
     *                     should be made to the user's specifications
     * @return The newly created Portfolio object as it is represented in the database.
     * @see PortfolioRequest
     */
    public Portfolio createPortfolio(PortfolioRequest newPortfolio){
        return null;
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
        return null;
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
        //get user from userService
        User user = userService.getUserById(request.getUsername());

        //get portfolio
        Set<Portfolio> userPortfolios = user.getPortfolios();
        Portfolio userPortfolio = null;

        for(Portfolio P: userPortfolios){
            if(P.getName().equals(request.getPortfolioName())){
                userPortfolio = P;
                break;
            }
        }

        //make changes to portfolio
        Optional<Tradeable> tradeable = marketService.findInfo(request.getItemSymbol());
        if (tradeable.isPresent()){
            Transaction transaction = new Transaction();
            transaction.setItem(tradeable.get());
            transaction.setTimestamp(request.getTimeStamp());
            Optional<ChangingNumber> price = marketService.getCurrentPrice(request.getItemSymbol(), 10000, 100000);
            if (price.isEmpty()) {
                throw new RuntimeException("Could not find price for " + request.getItemSymbol());
            }
            transaction.setPrice(price.get().value);
            transaction.setQuantity(request.getQuantity());

            //Update portfolio
            userPortfolio.setBalance(userPortfolio.getBalance()
                     - transaction.getQuantity() * transaction.getPrice());
            userPortfolio.getTransactions().add(transaction);

            Set<Asset> assets = userPortfolio.getAssets();
            //checks if the tradeable is already owned in the portfolio
            boolean alreadyOwn = false;
            for(Asset asset: assets){
                if(asset.getItem().equals(tradeable.get())){
                    asset.add(request.getQuantity());
                    alreadyOwn = true;
                    break;
                }
            }

            //adds the new asset
            if(!alreadyOwn){
                Asset newAsset = new Asset();
                newAsset.setItem(tradeable.get());
                newAsset.setQuantity(request.getQuantity());
                assets.add(newAsset);
            }

            return transaction;
        }
        return null;

    };

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
