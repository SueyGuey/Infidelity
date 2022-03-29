package infidelity.api.data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.UUID;

public class PortfolioRequest {
    private String username;
    private String portfolioName;
    private double accountBalance = 100000;
}
