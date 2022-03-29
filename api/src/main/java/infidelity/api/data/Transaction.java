package infidelity.api.data;

import lombok.*;

import javax.persistence.*;
import java.util.UUID;

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
