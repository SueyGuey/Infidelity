package infidelity.api.data;

import lombok.Getter;
import lombok.Setter;

/**
 * The leaderboard frontend only needs to know the portfolio name and the
 * portfolio % change.
 */
@Getter
@Setter
public class LeaderboardPortfolio {
    private String username;
    private String portfolioName;
    private double weekChange;
    private double monthChange;
    private double yearChange;
    private double allTimeChange;

    public LeaderboardPortfolio(Portfolio portfolio) {
        this.username = portfolio.getUsername();
        this.portfolioName = portfolio.getName();
        this.weekChange = portfolio.getWeekChange();
        this.monthChange = portfolio.getMonthChange();
        this.yearChange = portfolio.getYearChange();
        this.allTimeChange = portfolio.getAllTimeChange();
    }

}
