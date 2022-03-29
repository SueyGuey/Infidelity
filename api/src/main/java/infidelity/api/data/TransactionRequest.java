package infidelity.api.data;

import lombok.*;

import javax.persistence.*;
import java.util.UUID;

@Getter
public class TransactionRequest {
    private String username;
    private String itemSymbol;
    private String portfolioName;
    private double quantity;
    private long timeStamp;
}
