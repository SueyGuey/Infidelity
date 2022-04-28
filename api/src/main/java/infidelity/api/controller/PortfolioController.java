package infidelity.api.controller;

import infidelity.api.data.Portfolio;
import infidelity.api.data.PortfolioRequest;
import infidelity.api.data.Transaction;
import infidelity.api.data.TransactionRequest;
import infidelity.api.service.PortfolioService;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * REST api controller for portfolio-related requests. These endpoints also are
 * under the /user/ prefix, so making requests to these functions requires user
 * authentication tokens (i.e. you must be logged in).
 */
@RestController
@RequestMapping(path = "/user/portfolio")
@Slf4j
public class PortfolioController {
    @Autowired
    PortfolioService portfolioService;

    @PostMapping(path = "/create")
    public ResponseEntity<Portfolio> createPortfolio(@RequestBody PortfolioRequest request){
        Portfolio portfolio = portfolioService.createPortfolio(request);
        return new ResponseEntity<>(portfolio, HttpStatus.OK);
    }

    //TODO: implement function
    public ResponseEntity deletePortfolio(String username, String portfolioName){
        return null;
    }

    @PutMapping(path = "/set-active")
    public ResponseEntity setActivePortfolio(@RequestParam String username, @RequestParam String portfolioName) {
        log.info("PUT /user/portfolio/set-active, username: " + username + ", portfolioName: " + portfolioName);
        portfolioService.setActivePortfolio(username, portfolioName);
        return new ResponseEntity(HttpStatus.OK);
    }

    @PostMapping(path = "/trade")
    public ResponseEntity<Transaction> makeTransaction(@RequestBody TransactionRequest request){
        log.info("POST /user/portfolio/trade");
        Transaction transaction = portfolioService.makeTransaction(request);
        return new ResponseEntity<>(transaction, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<Portfolio> getPortfolio(@RequestParam String username, @RequestParam String portfolioName){
        log.info("GET /user/portfolio");
        Portfolio portfolio = portfolioService.getPortfolio(username, portfolioName);
        return new ResponseEntity<>(portfolio, HttpStatus.OK);
    }

    //TODO: implement function
    public void updateHistory(String username, String portfolioName){
        return;
    }
}
