package infidelity.api.controller;


import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import infidelity.api.data.ChangingNumber;
import infidelity.api.data.LeaderboardPortfolio;
import infidelity.api.data.Tradeable;
import infidelity.api.data.model.HibernateProxyTypeAdapter;
import infidelity.api.service.MarketService;
import infidelity.api.service.PortfolioService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 * REST api controller for leaderboard
 */
@RestController
@RequestMapping(path = "/leaderboard")
@Slf4j
public class LeaderboardController {

    @Autowired
    private PortfolioService portfolioService;

    @GetMapping
    public ResponseEntity<List<LeaderboardPortfolio>> getLB() {
        log.info("GET /leaderboard");
        return ResponseEntity.ok(portfolioService.getLeaderboard());
    }
}
