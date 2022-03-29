package infidelity.api.data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.UUID;

@Entity
public class PortfolioRequest {
    @Id
    @Column(nullable = false)
    private UUID portfolioRequestId;

    private String username;
    private String portfolioName;
    private double accountBalance = 100000;
}
