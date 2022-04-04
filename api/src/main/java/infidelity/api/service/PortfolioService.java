package infidelity.api.service;

import infidelity.api.data.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;

@Service
public class PortfolioService {
    @Autowired
    private UserService userService;

    @Autowired
    private MarketService marketService;

    //TODO: implement function
    public Portfolio createPortfolio(PortfolioRequest newPortfolio){
        return null;
    };

    //TODO: implement function
    public Portfolio getPortfolio(String username, String portfolioName){
        return null;
    };

    //TODO: implement function
    public boolean deletePortfolio(String username, String portfolioName){
        return true;
    };

    //TODO: add response when transaction fails: Not enough money to buy, selling more stocks than you have
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
        if(tradeable.isPresent()){
            Transaction transaction = new Transaction();
            transaction.setItem(tradeable.get());
            transaction.setTimestamp(request.getTimeStamp());
            transaction.setPrice(marketService.getCurrentPrice(request.getItemSymbol()).value);
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

    //TODO: implement function
    public void updateHistory(Portfolio portfolio){
        return;
    };
}
