package infidelity.api.stockdata;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaders;
import org.springframework.messaging.simp.stomp.StompSession;
import org.springframework.messaging.simp.stomp.StompSessionHandler;
import org.springframework.web.socket.client.WebSocketClient;
import org.springframework.web.socket.client.standard.StandardWebSocketClient;
import org.springframework.web.socket.messaging.WebSocketStompClient;

import java.lang.reflect.Type;

@Slf4j
public class WebsocketStompClient implements StompSessionHandler {
    private static final String FINNHUB_KEY = "c8oia22ad3iatn99l4u0";

    @Autowired
    private WebSocketStompClient stompClient;

    public WebsocketStompClient() {
        WebSocketClient webSocketClient = new StandardWebSocketClient();
        stompClient = new WebSocketStompClient(webSocketClient);

        StompSession stompSession;
        String loggerServerQueueUrl = "wss://ws.finnhub.io?token=" + FINNHUB_KEY;
        stompClient.connect(loggerServerQueueUrl,this);
    }

    @Override
    public void afterConnected(StompSession session, StompHeaders connectedHeaders) {
        log.info("afterConnected");
        session.subscribe(String.format("{\"type\":\"subscribe\",\"symbol\":\"%s\"}", "AAPL"), this);
    }

    @Override
    public void handleException(StompSession session, StompCommand command, StompHeaders headers, byte[] payload, Throwable exception) {
        log.info("handleException");

    }

    @Override
    public void handleTransportError(StompSession session, Throwable exception) {
        log.info("handleTransportError");
        exception.printStackTrace();
        log.error(exception.getMessage());
    }

    @Override
    public Type getPayloadType(StompHeaders headers) {
        log.info("getPayloadType");
        return null;
    }

    @Override
    public void handleFrame(StompHeaders headers, Object payload) {
        log.info("handleFrame");
    }
}
