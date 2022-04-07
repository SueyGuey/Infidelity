package infidelity.api.data;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * A watchlist is a list of stocks that a user has subscribed to and can view easily on their dashboard.
 * A User can have multiple watchlists and add stocks, cryptocurrencies, and ETFs to their watchlists.
 */
@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Watchlist {
    @Id
    @Column(nullable = false)
    @Builder.Default
    private UUID watchlistId = UUID.randomUUID();;

    private String name;

    @Builder.Default
    @ManyToMany
    private List<Tradeable> items = new ArrayList<>();
}
