package infidelity.api.data;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

/**
 * Tradeable is an abstract representation of anything with a unit price that the user can
 * purchase with their portfolio balance to acquire Assets. Stocks and Cryptocurrencies are examples
 * of Tradeable items.
 */
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public abstract class Tradeable {
    /**
     * UUID for tradeable items. There only exists a single instance of each stock and cryptocurrency
     * in our database, so this string serves as the primary key.
     * For stocks, this is the ticker symbol (e.g. "AMZN", "F", "MSFT", "GE")
     * For cryptocurrencies, this is the FinnHub subscription symbol: (e.g. "BINANCE:BTCUSDT" for Bitcoin)
     */
    @Id
    @Column
    public String symbol;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "current_price_id")
    private ChangingNumber currentPrice;

    @OneToOne
    @JoinColumn(name = "price_history_id")
    private NumberHistory priceHistory;
}
