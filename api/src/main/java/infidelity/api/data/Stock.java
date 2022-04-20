package infidelity.api.data;

import infidelity.api.stockdata.decode.FHQuoteResponse;
import lombok.*;

import javax.annotation.Nullable;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

/**
 * Stock is a class that represents tradeable common stocks.
 */
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Stock extends Tradeable {
    /**
     * Each stock is associated with a company, but for the purposes of our application it is
     * more intuitive and convenient for companies to be a property of the stock.
     */
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "company_name")
    private Company company;

    @OneToOne
    @JoinColumn(name = "volume_number_id")
    private ChangingNumber volume;

    private Double dayChange;
    private Double dayChangePercent;
    private Double dayHigh;
    private Double dayLow;
    private Double open;
    private Double previousClose;

    @Builder
    public Stock(String symbol,
                 Company company,
                 ChangingNumber price,
                 NumberHistory priceHistory,
                 ChangingNumber volume,
                 double popularity) {
        super(symbol, price, priceHistory, popularity);
        this.company = company;
        this.volume = volume;
    }

    public void updateQuote(FHQuoteResponse quote) {
        if (quote == null || quote.getTimestampSeconds() == 0) {
            return;
        }
        long timestamp = quote.getTimestampSeconds() * 1000;
        this.updatePrice(quote.getCurrentPrice(), timestamp);
        this.dayChange = quote.getChange();
        this.dayChangePercent = quote.getChangePercent();
        this.dayHigh = quote.getHigh();
        this.dayLow = quote.getLow();
        this.open = quote.getOpen();
        this.previousClose = quote.getPreviousClose();
    }

}
