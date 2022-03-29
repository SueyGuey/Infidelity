package infidelity.api.service;

import infidelity.api.data.Portfolio;
import infidelity.api.data.PortfolioRequest;
import infidelity.api.data.Transaction;
import infidelity.api.data.TransactionRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    //TODO: implement function
    public Transaction makeTransaction(TransactionRequest transaction){
        return null;
    };

    //TODO: implement function
    public void updateHistory(Portfolio portfolio){
        return;
    };
}
