package infidelity.api.data;

import lombok.*;

@Getter
public class TransactionRequest {
    private String username;
    private String itemSymbol;
    private String portfolioName;
    private double quantity;
    private long timeStamp;
}
