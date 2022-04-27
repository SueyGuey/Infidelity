package infidelity.api.scripts;

import infidelity.api.data.Portfolio;
import infidelity.api.service.PortfolioService;
import infidelity.api.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class Scripts {

    @Autowired
    private PortfolioService portfolioService;
    @Autowired
    private UserService userService;

    public void updatePortfolioUsernames() {
        log.info("Updating portfolio usernames");
        // loop through all users
        userService.findAll().forEach(user -> {
            // loop through all of the user's portfolios
            user.getPortfolios().forEach(portfolio -> {
                // update portfolio username
                portfolio.setUsername(user.getUsername());
                portfolioService.updatePortfolioValue(portfolio);
                // save portfolio
                portfolioService.save(portfolio);
            });
        });
    }

    public void updateLeaderboard() {
        log.info("Updating leaderboard");
        // loop through all users
        userService.findAll().forEach(user -> {
            // loop through all of the user's portfolios
            user.getPortfolios().forEach(Portfolio::toLeaderboardPortfolio);
        });
    }
}
