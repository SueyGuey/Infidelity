package infidelity.api.data;

import lombok.*;

import javax.persistence.*;
import java.util.UUID;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class TransactionRequest {
    @Id
    @Column(nullable = false)
    private UUID portfolioRequestId;

    private long timeStamp;
    @ManyToOne
    @JoinColumn(name = "transaction_request_item_symbol")
    private String username;
    private String portfolioName;
    private double quantity;
    private Tradeable item;
}
