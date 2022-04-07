package infidelity.api.stockdata;

import com.fasterxml.jackson.databind.ObjectMapper;
import infidelity.api.data.Company;
import infidelity.api.stockdata.decode.*;
import lombok.extern.slf4j.Slf4j;
import org.joda.time.DateTime;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URI;
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

    private WebsocketStompClient stompClient;

    /**
     * Map of all most recently updated prices
     */
    private Map<String, FHPriceMessage.PriceMessage> info = new HashMap<>();

    public FinnHub() {
        // BELOW IS WEBSOCKET CODE
        /*
        try {
            // open websocket
            clientEndpoint = new WebsocketClientEndpoint(new URI(FINNHUB_WS_ENDPOINT + FINNHUB_KEYS[0]));
            // add listener
            clientEndpoint.addMessageHandler(FinnHub.this::handleMessage);
        } catch (URISyntaxException e) {
            log.error("URISyntaxException exception: " + e.getMessage());
        } catch (Exception e) {
            if (e instanceof DeploymentException) {
                try {
                    clientEndpoint = new WebsocketClientEndpoint(new URI(FINNHUB_ENDPOINT + FINNHUB_KEYS[1]));
                } catch (URISyntaxException ure) {
                    ure.printStackTrace();
                }
            }
        }
        //*/
        // stompClient = new WebsocketStompClient();
    }

    private void handleOpen() {
        subscribe("AAPL");
    }

    private void handleMessage(String messageStr) {
        if (!decoder.willDecode(messageStr)) return;
        FHPriceMessage message = decoder.decode(messageStr);
        System.out.println(message);
        List<FHPriceMessage.PriceMessage> data = message.getData();
        if (data.isEmpty()) return;
        // only use the most recent update
        FHPriceMessage.PriceMessage mostRecent = data.get(data.size() - 1);
        info.put(mostRecent.getSymbol(), mostRecent);
    }

    /**
     * Add a subscription for US stocks, forex, and crypto.
     * @param symbol ticker symbol for stocks
     */
    public void subscribe(String symbol) {
        String subMsg = String.format("{\"type\":\"subscribe\",\"symbol\":\"%s\"}", symbol);
        if (clientEndpoint != null)
            clientEndpoint.sendMessage(subMsg);
    }

    public boolean hasData(String symbol) {
        return info.containsKey(symbol) && info.get(symbol) != null;
    }

    public FHPriceMessage.PriceMessage getInfo(String symbol) {
        if (info.containsKey(symbol)) {
            return info.get(symbol);
        } else {
            FHPriceMessage.PriceMessage message = fetchInfo(symbol);
            info.put(symbol, message);
            return message;
        }
    }

    public FHPriceMessage.PriceMessage fetchInfo(String symbol) {
        double currentPrice = 40 + Math.random() * 300;
        if (info.containsKey(symbol)) {
            currentPrice = info.get(symbol).getPrice();
        }
        long now = DateTime.now().getMillis();
        double price = currentPrice + (Math.random() - 0.5) * 0.2 + Math.random() * 0.02;
        double volume = 4275;
        return new FHPriceMessage.PriceMessage(symbol, price, now, volume);
    }

    public void getPrice1(String symbol) {
        try {
            var values = new HashMap<String, String>() {{
                put("event", "earnings");
                put("symbol", symbol);
            }};

            var objectMapper = new ObjectMapper();
            String requestBody = objectMapper
                    .writeValueAsString(values);

            HttpClient client = HttpClient.newHttpClient();
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(FINNHUB_ENDPOINT))
                    .POST(HttpRequest.BodyPublishers.ofString(requestBody))
                    .build();

            HttpResponse<String> response = client.send(request,
                    HttpResponse.BodyHandlers.ofString());

            System.out.println(response.body());
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
    }

    public void search(String query) {
        // standard http connection
    }

    /**
     * Lists all available symbols in the US stock market.
     * Takes about 4 seconds to complete when just returning common stocks.
     * @return
     */
    public List<String> listExchange() {
        String url = "https://finnhub.io/api/v1/stock/symbol?exchange=US&currency=USD&securityType=Common%20Stock&token=" + FINNHUB_KEYS[0];
        List<String> results = new ArrayList<>();
        Set<String> types = new HashSet<>();
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
                    String symbol = entity.getSymbol();
                    String type = entity.getType();
                    types.add(type);
                    results.add(symbol);
                }
                for (String type : types) {
                    log.info("Type {}", type);
                }
            }
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
        return results;
    }

    public Company getCompanyProfile(String symbol) {
        String url = "https://finnhub.io/api/v1/stock/profile2?symbol=" + symbol + "&token=" + FINNHUB_KEYS[0];
        Company company = null;
        try {
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
                FHCompanyResponse companyData = companyDecoder.decode(body);
                company = Company.builder()
                        .name(companyData.getName())
                        .industry(companyData.getFinnhubIndustry())
                        .weburl(companyData.getWeburl())
                        .country(companyData.getCountry())
                        .build();
            }
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
        return company;
    }
}
