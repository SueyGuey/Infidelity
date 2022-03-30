package infidelity.api.data;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public abstract class Tradeable {
    @Id
    @Column
    private String symbol;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "current_price_id")
    private ChangingNumber currentPrice;
    @OneToOne
    @JoinColumn(name = "price_history_id")
    private NumberHistory priceHistory;
}
