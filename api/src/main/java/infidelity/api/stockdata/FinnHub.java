package infidelity.api.stockdata;

import infidelity.api.data.Company;
import infidelity.api.stockdata.decode.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.websocket.DeploymentException;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.*;

@Service
@Slf4j
public class FinnHub {
    private final String[] FINNHUB_KEYS = {"c8kmugaad3ibbdm3vo8g", "c8oia22ad3iatn99l4u0"};
    private final String FINNHUB_WS_ENDPOINT = "wss://ws.finnhub.io?token=";
    private final String FINNHUB_ENDPOINT = "https://finnhub.io/api/v1/webhook/add?token=";

    private WebsocketClientEndpoint clientEndpoint;
    private final FHPriceDecoder decoder = new FHPriceDecoder();
    private final FHSymbolDecoder symbolDecoder = new FHSymbolDecoder();
    private final FHCompanyDecoder companyDecoder = new FHCompanyDecoder();
    private final FHSearchDecoder searchDecoder = new FHSearchDecoder();

    private Set<String> subscribedSymbols = new HashSet<>();

    private WebsocketStompClient stompClient;

    /**
     * Map of all most recently updated prices
     */
    private Map<String, FHPriceMessage.PriceMessage> info = new HashMap<>();

    public FinnHub() {
        log.info("Initializing FinnHub");
        // BELOW IS WEBSOCKET CODE
        //*
        try {
            // open websocket
            clientEndpoint = new WebsocketClientEndpoint(new URI(FINNHUB_WS_ENDPOINT + FINNHUB_KEYS[0]));
            clientEndpoint.addMessageHandler(this::handleMessage);
        } catch (URISyntaxException e) {
            log.error("URISyntaxException exception: " + e.getMessage());
        } catch (Exception e) {
            if (e instanceof DeploymentException) {
                log.error("DeploymentException exception: " + e.getMessage());
                try {
                    clientEndpoint = new WebsocketClientEndpoint(new URI(FINNHUB_ENDPOINT + FINNHUB_KEYS[1]));
                } catch (URISyntaxException ure) {
                    ure.printStackTrace();
                }
            }
        }
    }

    private void handleMessage(String messageStr) {
        if (!decoder.willDecode(messageStr)) return;
        FHPriceMessage message = decoder.decode(messageStr);
        System.out.println(message);
        List<FHPriceMessage.PriceMessage> data = message.getData();
        if (data.isEmpty()) return;
        // only use the most recent update, which is the last element in the list
        FHPriceMessage.PriceMessage mostRecent = data.get(data.size() - 1);
        info.put(mostRecent.getSymbol(), mostRecent);
    }

    /**
     * Add a subscription for US stocks, forex, and crypto.
     * @param symbol ticker symbol for stocks
     */
    public void subscribe(String symbol) {
        String subMsg = String.format("{\"type\":\"subscribe\",\"symbol\":\"%s\"}", symbol);
        if (clientEndpoint != null) {
            clientEndpoint.sendMessage(subMsg);
            subscribedSymbols.add(symbol);
        }
    }

    /**
     * Remove a subscription for US stocks, forex, and crypto.
     * @param symbol ticker symbol for stocks
     */
    public void unsubscribe(String symbol) {
        String subMsg = String.format("{\"type\":\"unsubscribe\",\"symbol\":\"%s\"}", symbol);
        if (clientEndpoint != null) {
            clientEndpoint.sendMessage(subMsg);
            subscribedSymbols.add(symbol);
        }
    }

    public boolean hasData(String symbol) {
        return info.containsKey(symbol) && info.get(symbol) != null;
    }

    public FHPriceMessage.PriceMessage getPrice(String symbol) {
        if (info.containsKey(symbol)) {
            return info.get(symbol);
        } else {
            FHPriceMessage.PriceMessage message = fetchPrice(symbol);
            info.put(symbol, message);
            return message;
        }
    }

    /**
     * Fetch the most recent price for a given symbol from FinnHub
     * @param symbol ticker symbol for stocks
     * @return most recent price for the symbol
     */
    public FHPriceMessage.PriceMessage fetchPrice(String symbol) {
        if (!subscribedSymbols.contains(symbol)) {
            subscribe(symbol);
        }
        while(!hasData(symbol)) {
            try {
                Thread.sleep(100);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        return info.get(symbol);
    }

    /**
     * Lists all available symbols in the US stock market.
     * Takes about 4 seconds to complete when just returning common stocks.
     * @return list of symbols
     */
    public List<String> listExchange() {
        String url = "https://finnhub.io/api/v1/stock/symbol?exchange=US&currency=USD&securityType=Common%20Stock&token=" + FINNHUB_KEYS[0];
        List<String> results = new ArrayList<>();
        try {
            HttpClient client = HttpClient.newHttpClient();
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(url))
                    .GET()
                    .build();
            HttpResponse<String> response = client.send(request,
                    HttpResponse.BodyHandlers.ofString());
            String body = response.body();

            if (!symbolDecoder.willDecode(body)) {
                log.error("Error parsing response {}", body);
            } else {
                List<FHSymbolResponse> symbols = List.of(symbolDecoder.decode(body));
                for (FHSymbolResponse entity : symbols) {
                    results.add(entity.getSymbol());
                }
            }
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
        return results;
    }

    /**
     * Searches the stock market for tradeable entities
     * @param query search query provided by user from the UI
     * @return FHSearchResponse object containing the search results
     */
    public FHSearchResponse search(String query) {
        String url = String.format("https://finnhub.io/api/v1/search?q=%s&token=%s", query, FINNHUB_KEYS[0]);
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .GET()
                .build();
        try {
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            String body = response.body();
            if (!searchDecoder.willDecode(body)) {
                log.error("Error parsing response {}", body);
            } else {
                return searchDecoder.decode(body);
            }
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
        return null;
    }

    /**
     * Fetches company information for a given symbol from the API. This includes all the properties
     * in the FHCompanyResponse object, but unfortunately the API does not provide a way to get a description.
     * @param symbol symbol to fetch information for
     * @return FHCompanyResponse object containing the company information
     */
    public FHCompanyResponse getCompanyProfile(String symbol) {
        try {
            String url = String.format("https://finnhub.io/api/v1/stock/profile2?symbol=%s&token=%s", symbol, FINNHUB_KEYS[0]);
            HttpClient client = HttpClient.newHttpClient();
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(url))
                    .GET()
                    .build();
            HttpResponse<String> response = client.send(request,
                    HttpResponse.BodyHandlers.ofString());
            String body = response.body();

            if (!companyDecoder.willDecode(body)) {
                log.error("Error parsing response {}", body);
            } else {
                return companyDecoder.decode(body);
            }
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
        return null;
    }
}
