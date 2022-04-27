package infidelity.api.scripts;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/scripts")
@Slf4j
public class ScriptController {

    @Autowired
    private Scripts scripts;

    @PostMapping(path = "/portfolioUsernames")
    public void runPortfolioUsernames() {
        log.info("portfolioUsernames");
        scripts.updatePortfolioUsernames();
    }

    @PostMapping(path = "/leaderboard")
    public void runLeaderboard() {
        log.info("leaderboard");
        scripts.updateLeaderboard();
    }
}
