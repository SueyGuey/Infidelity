package infidelity.api.controller;

import infidelity.api.data.Portfolio;
import infidelity.api.data.PortfolioRequest;
import infidelity.api.data.TransactionRequest;
import infidelity.api.service.PortfolioService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping(path = "/user/portfolio")
@Slf4j
public class PortfolioController {
    @Autowired
    PortfolioService portfolioService;

    //TODO: implement function
    public ResponseEntity<Portfolio> createPortfolio(PortfolioRequest request){
        return null;
    }

    //TODO: implement function
    public ResponseEntity deletePortfolio(String username, String portfolioName){
        return null;
    }

    //TODO: implement function
    public ResponseEntity<TransactionRequest> makeTransaction(TransactionRequest request){
        return null;
    }

    //TODO: implement function
    public void updateHistory(String username, String portfolioName){
        return;
    }
}
