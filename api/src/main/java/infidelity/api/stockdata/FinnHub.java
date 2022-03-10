package infidelity.api.stockdata;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
public class FinnHub {
    private final String FINNHUB_KEY = "c8kmugaad3ibbdm3vo8g";
    private final String FINNHUB_ENDPOINT = "wss://ws.finnhub.io?token=" + FINNHUB_KEY;

    private WebsocketClientEndpoint clientEndpoint;
    private final FHMessageDecoder decoder = new FHMessageDecoder();

    /**
     * Map of all most recently updated prices
     */
    private Map<String, FinnHubMessage.PriceMessage> info = new HashMap<>();

    public FinnHub() {
        try {
            // open websocket
            clientEndpoint = new WebsocketClientEndpoint(new URI(FINNHUB_ENDPOINT));
            // add listener
            clientEndpoint.addMessageHandler(FinnHub.this::handleMessage);
        } catch (URISyntaxException e) {
            log.error("URISyntaxException exception: " + e.getMessage());
        }
    }

    private void handleMessage(String messageStr) {
        FinnHubMessage message = decoder.decode(messageStr);
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

    public FinnHubMessage.PriceMessage getInfo(String symbol) {
        return info.get(symbol);
    }
}
