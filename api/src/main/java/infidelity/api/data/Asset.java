package infidelity.api.data;

import infidelity.api.data.repository.ChangingNumberRepository;
import lombok.*;

import javax.persistence.*;
import java.util.UUID;

/**
 * Assets represent a quantity of a specific tradeable entity (e.g. a stock, a bond, a currency, etc.)
 * that is owned by a portfolio. Assets are identified by a unique identifier in the database.
 * Assets are not immutable, and can be modified by the add and subtract methods.
 */
@Entity
@Getter
@Setter
@NoArgsConstructor
public class Asset {
    @Id
    @Column(nullable = false)
    private String assetId;

    @OneToOne
    @JoinColumn(name = "asset_item_symbol")
    private Tradeable item;
    private double quantity = 0;
    @OneToOne(cascade = CascadeType.ALL)
    private ChangingNumber value;

    public Asset(Tradeable item, double quantity) {
        this.assetId = UUID.randomUUID().toString();
        this.item = item;
        this.quantity = quantity;
        this.value = ChangingNumber.builder()
                .numberId(this.assetId + "_asset_value")
                .value(item.getCurrentPrice().getValue() * quantity)
                .lastUpdated(item.getCurrentPrice().getLastUpdated())
                .build();
    }

    public void add(double amount) {
        quantity += amount;
    }

    public void subtract(double amount) {
        quantity -= amount;
    }
}
