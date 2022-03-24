package infidelity.api.data;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
public abstract class Tradeable {
    @Id
    @Column(nullable = false)
    private String symbol;
    @OneToOne
    @JoinColumn(name = "current_price_id")
    private ChangingNumber currentPrice;
    @OneToOne
    @JoinColumn(name = "price_history_id")
    private NumberHistory priceHistory;
}
