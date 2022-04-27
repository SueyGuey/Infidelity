package infidelity.api.data;

import lombok.*;
import org.springframework.data.util.Pair;

import javax.persistence.*;
import java.util.*;

/**
 * Portfolio class represents a collection of Assets purchased by a user.
 * Each Portfolio has a unique name, balance, a set of Assets, and a history of transactions.
 * Portfolios are stored in the User class as each Portfolio belongs to a single User.
 * @see PortfolioRequest for the user specification of new Portfolios.
 */
@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Portfolio {
    @Id
    @Column
    @Builder.Default
    private String portfolioId = UUID.randomUUID().toString();

    private String username;

    /**
     * The name of the Portfolio as given by the user when creating the Portfolio.
     */
    private String name;

    /**
     * The liquid balance of the Portfolio in USD, which represents the money that
     * the user has available to purchase new Assets.
     */
    @Builder.Default
    private double balance = 100000;

    private double weekChange;
    private double monthChange;
    private double yearChange;
    private double allTimeChange;

    @OneToOne(cascade = CascadeType.ALL)
    private ChangingNumber totalValue;
    @OneToOne(cascade = CascadeType.ALL)
    private NumberHistory valueHistory;

    /**
     * The history of transactions that have occurred on this Portfolio.
     * @see Transaction
     */
    @Builder.Default
    @OneToMany
    private List<Transaction> transactions = new ArrayList<>();

    /**
     * The set of Assets that are owned by this Portfolio.
     * @see Asset
     */
    @Builder.Default
    @OneToMany
    private Set<Asset> assets = new HashSet<>();

    public LeaderboardPortfolio toLeaderboardPortfolio() {
        // update the necessary fields if null
        long now = System.currentTimeMillis();
        if (weekChange == 0) {
            // approximate the change in value over the past week
            long oneWeekAgo = now - (7 * 24 * 60 * 60 * 1000);
            Pair<Long, Double> initialValue = valueHistory.findValueAt(oneWeekAgo);
            this.weekChange = 100 * ((this.totalValue.getValue() / initialValue.getSecond()) - 1);
        }
        if (monthChange == 0) {
            // approximate the change in value over the past month
            long oneMonthAgo = now - (30L * 24 * 60 * 60 * 1000);
            Pair<Long, Double> initialValue = valueHistory.findValueAt(oneMonthAgo);
            this.monthChange = 100 * ((this.totalValue.getValue() / initialValue.getSecond()) - 1);
        }
        if (yearChange == 0) {
            // approximate the change in value over the past year
            long oneYearAgo = now - (365L * 24 * 60 * 60 * 1000);
            Pair<Long, Double> initialValue = valueHistory.findValueAt(oneYearAgo);
            this.yearChange = 100 * ((this.totalValue.getValue() / initialValue.getSecond()) - 1);
        }
        return new LeaderboardPortfolio(this);
    }
}
