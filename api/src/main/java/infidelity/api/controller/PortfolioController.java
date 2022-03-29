package infidelity.api.controller;

import infidelity.api.service.PortfolioService;
import org.springframework.beans.factory.annotation.Autowired;

public class PortfolioController {
    @Autowired
    PortfolioService portfolioService;
}
