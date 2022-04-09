package infidelity.api.data;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
public class Stock extends Tradeable {
    /**
     * Each stock is associated with a company, but for the purposes of our application it is
     * more intuitive and convenient for companies to be a property of the stock.
     */
    @OneToOne
    @JoinColumn(name = "company_name")
    private Company company;

    @OneToOne
    @JoinColumn(name = "volume_number_id")
    private ChangingNumber volume;

    @Builder
    public Stock(String symbol,
                 Company company,
                 ChangingNumber price,
                 NumberHistory priceHistory,
                 ChangingNumber volume) {
        super(symbol, price, priceHistory);
        this.company = company;
        this.volume = volume;
    }
}
