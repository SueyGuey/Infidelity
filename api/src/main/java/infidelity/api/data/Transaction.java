package infidelity.api.data;

import lombok.*;

import javax.persistence.*;
import java.util.UUID;

/**
 * Transactions represent information about an instance of a purchase or sale of a tradeable asset.
 * They are used to track the value of the Portfolio and are displayed in the UI for a given Portfolio.
 */
@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Transaction {
    @Id
    @Column(nullable = false)
    @Builder.Default
    private UUID transactionId = UUID.randomUUID();;

    private long timestamp;
    @ManyToOne
    @JoinColumn(name = "transaction_item_symbol")
    private Tradeable item;
    private double price;
    private double quantity;
}
