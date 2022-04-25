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

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "price_history_id")
    private NumberHistory priceHistory;

    private double popularity = 0;

    public ChangingNumber updatePrice(double price, long timestamp) {
        if (currentPrice == null) {
            currentPrice = ChangingNumber.builder()
                    .numberId(String.format("%s_price", symbol))
                    .value(price)
                    .lastUpdated(timestamp)
                    .build();
        } else {
            currentPrice.update(price, timestamp);
        }
        if (priceHistory == null) {
            priceHistory = new NumberHistory(symbol + "_price_history");
        }
        priceHistory.add(price, timestamp);
        return currentPrice;
    }
}
