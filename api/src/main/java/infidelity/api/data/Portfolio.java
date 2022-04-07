package infidelity.api.data;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
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
    private UUID portfolioId = UUID.randomUUID();

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
}
