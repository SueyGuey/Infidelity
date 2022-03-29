package infidelity.api.controller;

import infidelity.api.service.PortfolioService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping(path = "/user/portfolio")
@Slf4j
public class PortfolioController {
    @Autowired
    PortfolioService portfolioService;
}
