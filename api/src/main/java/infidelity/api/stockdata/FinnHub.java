package infidelity.api.stockdata;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.*;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
public class FinnHub {
    private final String FINNHUB_KEY = "c8kmugaad3ibbdm3vo8g";
    private final String FINNHUB_WS_ENDPOINT = "wss://ws.finnhub.io?token=" + FINNHUB_KEY;
    private final String FINNHUB_ENDPOINT = "https://finnhub.io/api/v1/webhook/add?token=" + FINNHUB_KEY;

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
        /*
        try {
            // open websocket
            clientEndpoint = new WebsocketClientEndpoint(new URI(FINNHUB_WS_ENDPOINT));
            // add listener
            clientEndpoint.addMessageHandler(FinnHub.this::handleMessage);
        } catch (URISyntaxException e) {
            log.error("URISyntaxException exception: " + e.getMessage());
        }
        stompClient = new WebsocketStompClient();
        */
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
        clientEndpoint.sendMessage(subMsg);
    }

    public boolean hasData(String symbol) {
        return info.containsKey(symbol) && info.get(symbol) != null;
    }

    public FinnHubMessage.PriceMessage getInfo(String symbol) {
        return info.get(symbol);
    }

    public void doThing(String symbol) {
        try {
            var values = new HashMap<String, String>() {{
                put("event", "earnings");
                put ("symbol", symbol);
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

    public void listExchange() {
        String url = "https://finnhub.io/api/v1/stock/symbol?exchange=US&currency=USD&token=c8oia22ad3iatn99l4u0";
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
                    System.out.println(symbols.get(i).getSymbol());
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
