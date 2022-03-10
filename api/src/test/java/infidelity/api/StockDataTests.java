package infidelity.api;

import infidelity.api.stockdata.FinnHubMessage;
import infidelity.api.stockdata.MessageDecoder;
import infidelity.api.stockdata.WebsocketClientEndpoint;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import static org.assertj.core.api.Assertions.assertThat;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;

@SpringBootTest
@Slf4j
public class StockDataTests {
    private final String FINNHUB_KEY = "c8kmugaad3ibbdm3vo8g";
    private final String FINNHUB_ENDPOINT = "wss://ws.finnhub.io?token=" + FINNHUB_KEY;

    private final String maybeAnotherAPI = "wss://real.okcoin.cn:10440/websocket/okcoinapi";

    private final MessageDecoder decoder = new MessageDecoder();

    private double parsePriceFH(String priceData) {
        return 0.4;
    }

    @Test
    void testFinnHub() {
        int waitTime = 3000; // milliseconds
        try {
            // open websocket
            final WebsocketClientEndpoint clientEndpoint = new WebsocketClientEndpoint(new URI(FINNHUB_ENDPOINT));

            List<Double> prices = new ArrayList<>();

            // add listener
            clientEndpoint.addMessageHandler(new WebsocketClientEndpoint.MessageHandler() {
                public void handleMessage(String message) {
                    prices.add(parsePriceFH(message));
                    System.out.println(message);
                }
            });

            // subscribe to Bitcoin price updates
            String subscribeBTC = "{\"type\":\"subscribe\",\"symbol\":\"BINANCE:BTCUSDT\"}";
            clientEndpoint.sendMessage(subscribeBTC);

            // wait for price updates to roll in
            Thread.sleep(waitTime);

            assertThat(prices.size()).isGreaterThan(0);

        } catch (URISyntaxException e) {
            log.error("URISyntaxException exception: " + e.getMessage());
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    @Test
    void testFinnHubParse() {
        int waitTime = 3000; // milliseconds
        try {
            // open websocket
            final WebsocketClientEndpoint clientEndpoint = new WebsocketClientEndpoint(new URI(FINNHUB_ENDPOINT));
            List<FinnHubMessage> prices = new ArrayList<>();
            // add listener
            clientEndpoint.addMessageHandler(new WebsocketClientEndpoint.MessageHandler() {
                public void handleMessage(String message) {
                    prices.add(decoder.decode(message));
                    System.out.println(message);
                }
            });

            // subscribe to Bitcoin price updates
            String subscribeBTC = "{\"type\":\"subscribe\",\"symbol\":\"BINANCE:BTCUSDT\"}";
            clientEndpoint.sendMessage(subscribeBTC);

            // wait for price updates to roll in
            Thread.sleep(waitTime);

            for (FinnHubMessage message : prices) {
                System.out.println(message);
                assertThat(message.getData()).isNotNull();
                assertThat(message.getType()).isNotNull();
                for (FinnHubMessage.PriceMessage update : message.getData()) {
                    assertThat(update.getTimestamp()).isNotNull();
                    assertThat(update.getPrice()).isNotNull();
                    assertThat(update.getSymbol()).isNotNull();
                    assertThat(update.getVolume()).isNotNull();
                }
            }
        } catch (URISyntaxException e) {
            log.error("URISyntaxException exception: " + e.getMessage());
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
