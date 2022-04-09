package infidelity.api.data;

import lombok.Getter;
import lombok.Setter;

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
