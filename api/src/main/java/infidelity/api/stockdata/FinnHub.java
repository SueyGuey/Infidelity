package infidelity.api.stockdata;

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

    private WebsocketClientEndpoint clientEndpoint;
    private final FHPriceDecoder decoder = new FHPriceDecoder();
    private final FHSymbolDecoder symbolDecoder = new FHSymbolDecoder();
    private final FHCompanyDecoder companyDecoder = new FHCompanyDecoder();
    private final FHSearchDecoder searchDecoder = new FHSearchDecoder();
    private final FHQuoteDecoder quoteDecoder = new FHQuoteDecoder();

    private Map<String, Long> subscribedSymbols = new HashMap<>();

    private PriceMessageHandler priceMessageHandler;

    /**
     * Map of all most recently updated prices
     */
    private final Map<String, FHPriceMessage.PriceMessage> cache = new HashMap<>();

    public FinnHub() {
        log.info("Initializing FinnHub");
        initWebsocket();
    }

    private void initWebsocket(String key) throws URISyntaxException, DeploymentException, IOException {
        String FINNHUB_WS_ENDPOINT = "wss://ws.finnhub.io?token=";
        clientEndpoint = new WebsocketClientEndpoint(new URI(FINNHUB_WS_ENDPOINT + key));
        clientEndpoint.addMessageHandler(this::handleMessage);
        clientEndpoint.addCloseHandler(this::handleClose);
    }

    private void initWebsocket() {
        for (String key : FINNHUB_KEYS) {
            try {
                initWebsocket(key);
                return;
            } catch (URISyntaxException | DeploymentException | IOException e) {
                clientEndpoint = null;
                log.warn("FinnHub websocket initialization failed with key {}\nError: {}", key, e.getMessage());
            }
        }
    }

    private void handleMessage(String messageStr) {
        if (!decoder.willDecode(messageStr)) return;
        FHPriceMessage message = decoder.decode(messageStr);
        List<FHPriceMessage.PriceMessage> data = message.getData();
        if (data.isEmpty()) return;
        // only use the most recent update, which is the last element in the list
        FHPriceMessage.PriceMessage mostRecent = data.get(data.size() - 1);
        String symbol = mostRecent.getSymbol();
        cache.put(symbol, mostRecent);
        if (subscribedSymbols.containsKey(symbol)
                && System.currentTimeMillis() - subscribedSymbols.get(symbol) > 100000) {
            log.info("Received unneeded price update for {}, unsubscribing", symbol);
            unsubscribe(symbol);
        }
        if (priceMessageHandler != null) {
            priceMessageHandler.handlePriceMessage(mostRecent);
        }
    }

    private void handleClose() {
        initWebsocket();
    }

    /**
     * Add a subscription for US stocks, forex, and crypto.
     * @param symbol ticker symbol for stocks
     */
    public void subscribe(String symbol) {
        String subMsg = String.format("{\"type\":\"subscribe\",\"symbol\":\"%s\"}", symbol);
        if (clientEndpoint != null) {
            clientEndpoint.sendMessage(subMsg);
            subscribedSymbols.put(symbol, System.currentTimeMillis());
        }
    }

    public boolean hasData(String symbol) {
        return cache.containsKey(symbol) && cache.get(symbol) != null;
    }

    public FHPriceMessage.PriceMessage getPrice(String symbol) {
        if (cache.containsKey(symbol)) {
            if (subscribedSymbols.containsKey(symbol)) {
                subscribedSymbols.put(symbol, System.currentTimeMillis());
            }
            return cache.get(symbol);
        } else {
            subscribe(symbol);
            return null;
        }
    }

    /**
     * Fetch the most recent price of a given symbol from FinnHub
     * @param symbol ticker symbol for stocks
     * @return most recent price of the symbol
     */
    public FHPriceMessage.PriceMessage waitForPrice(String symbol, long timeout) throws RuntimeException {
        if (!subscribedSymbols.containsKey(symbol)) {
            subscribe(symbol);
        } else {
            subscribedSymbols.put(symbol, System.currentTimeMillis());
        }
        long start = System.currentTimeMillis();
        while (!hasData(symbol)) {
            if (System.currentTimeMillis() - start >= timeout) {
                log.warn("Timed out waiting for price of {}", symbol);
                throw new RuntimeException("Timed out waiting for price of " + symbol);
            }
            try {
                Thread.sleep(100);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        return cache.get(symbol);
    }

    /**
     * Unsubscribe from a given symbol
     * @param symbol ticker symbol for stocks
     */
    private void unsubscribe(String symbol) {
        String subMsg = String.format("{\"type\":\"unsubscribe\",\"symbol\":\"%s\"}", symbol);
        if (clientEndpoint != null) {
            clientEndpoint.sendMessage(subMsg);
            subscribedSymbols.remove(symbol);
        }
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
                    if (!entity.getSymbol().contains(".")) {
                        results.add(entity.getSymbol());
                    }
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
                log.error("Error parsing symbol {} /profile2 response {}", symbol, body);
            } else {
                return companyDecoder.decode(body);
            }
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
        return null;
    }

    public FHQuoteResponse getQuote(String symbol) {
        try {
            String url = String.format("https://finnhub.io/api/v1/quote?symbol=%s&token=%s", symbol, FINNHUB_KEYS[0]);
            HttpClient client = HttpClient.newHttpClient();
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(url))
                    .GET()
                    .build();
            HttpResponse<String> response = client.send(request,
                    HttpResponse.BodyHandlers.ofString());
            String body = response.body();
            if (!quoteDecoder.willDecode(body)) {
                log.error("Error parsing symbol {} /quote response {}", symbol, body);
                return null;
            } else {
                FHQuoteResponse quote = quoteDecoder.decode(body);
                return quote;
            }
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
            return null;
        }
    }

    public void addMessageHandler(PriceMessageHandler msgHandler) {
        this.priceMessageHandler = msgHandler;
    }

    /**
     * Message handler.
     */
    public static interface PriceMessageHandler {
        public void handlePriceMessage(FHPriceMessage.PriceMessage message);
    }
}
