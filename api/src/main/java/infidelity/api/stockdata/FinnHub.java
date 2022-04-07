package infidelity.api.stockdata;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.joda.time.DateTime;
import org.springframework.stereotype.Service;

import javax.websocket.DeploymentException;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
public class FinnHub {
    private final String[] FINNHUB_KEYS = {"c8kmugaad3ibbdm3vo8g", "c8oia22ad3iatn99l4u0"};
    private final String FINNHUB_WS_ENDPOINT = "wss://ws.finnhub.io?token=";
    private final String FINNHUB_ENDPOINT = "https://finnhub.io/api/v1/webhook/add?token=";

    private WebsocketClientEndpoint clientEndpoint;
    private final FHMessageDecoder decoder = new FHMessageDecoder();
    private final FHSymbolDecoder symbolDecoder = new FHSymbolDecoder();

    private WebsocketStompClient stompClient;

    /**
     * Map of all most recently updated prices
     */
    private Map<String, FinnHubMessage.PriceMessage> info = new HashMap<>();

    public FinnHub() {
        // BELOW IS WEBSOCKET CODE
        //*
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
        FinnHubMessage message = decoder.decode(messageStr);
        System.out.println(message);
        List<FinnHubMessage.PriceMessage> data = message.getData();
        if (data.isEmpty()) return;
        // only use the most recent update
        FinnHubMessage.PriceMessage mostRecent = data.get(data.size() - 1);
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

    public FinnHubMessage.PriceMessage getInfo(String symbol) {
        if (info.containsKey(symbol)) {
            return info.get(symbol);
        } else {
            FinnHubMessage.PriceMessage message = fetchInfo(symbol);
            info.put(symbol, message);
            return message;
        }
    }

    public FinnHubMessage.PriceMessage fetchInfo(String symbol) {
        double currentPrice = 40 + Math.random() * 300;
        if (info.containsKey(symbol)) {
            currentPrice = info.get(symbol).getPrice();
        }
        long now = DateTime.now().getMillis();
        double price = currentPrice + (Math.random() - 0.5) * 0.2 + Math.random() * 0.02;
        double volume = 4275;
        return new FinnHubMessage.PriceMessage(symbol, price, now, volume);
    }

    public void doThing(String symbol) {
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

    public List<String> listExchange() {
        String url = "https://finnhub.io/api/v1/stock/symbol?exchange=US&currency=USD&token=c8oia22ad3iatn99l4u0";
        List<String> results = new ArrayList<>();
        try {
            HttpURLConnection con = (HttpURLConnection) new URL(url).openConnection();
            con.setRequestMethod("GET");
            System.out.println(con.getContentLength());
            System.out.println(con.getContent());
            String response = con.getResponseMessage();
            if (!symbolDecoder.willDecode(response)) {
                log.error("Error parsing response {}", response);
            } else {
                List<FHSymbolResponse> symbols = List.of(symbolDecoder.decode(response));
                for (int i = 0; i < 10; i++) {
                    String symbol = symbols.get(i).getSymbol();
                    System.out.println(symbol);
                    results.add(symbol);
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return results;
    }
}
