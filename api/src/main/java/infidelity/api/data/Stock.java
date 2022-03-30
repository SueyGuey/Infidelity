package infidelity.api.data;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Stock extends Tradeable {
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
