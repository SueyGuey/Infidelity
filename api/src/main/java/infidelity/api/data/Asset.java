package infidelity.api.data;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.UUID;

/**
 * Assets represent
 */
@Entity
@Getter
@Setter
public class Asset {
    @Id
    @Column(nullable = false)
    private UUID assetId;

    @OneToOne
    @JoinColumn(name = "asset_item_symbol")
    private Tradeable item;
    private double quantity;

    public void add(double amount) {
        quantity += amount;
    }

    public void subtract(double amount) {
        quantity -= amount;
    }
}
