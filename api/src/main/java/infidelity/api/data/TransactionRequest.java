package infidelity.api.data;

import lombok.Getter;

/**
 * TransactionRequest is a POJO that represents a request to perform a transaction from the client.
 * These objects are passed as a JSON object to the API by the frontend,
 * and hold all the information needed to perform the transaction on the backend.
 * @see infidelity.api.controller.PortfolioController#makeTransaction(TransactionRequest)
 * @see infidelity.api.service.PortfolioService#makeTransaction(TransactionRequest)
 */
@Getter
public class TransactionRequest {
    private String username;
    private String itemSymbol;
    private String portfolioName;
    private double quantity;
    private long timeStamp;
}
