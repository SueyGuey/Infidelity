package infidelity.api.stockdata;

import lombok.extern.slf4j.Slf4j;

import javax.websocket.*;
import java.net.URI;

/**
 * WebsocketClientEndpoint
 * @author http://www.programmingforliving.com/2013/08/jsr-356-java-api-for-websocket-client-api.html
 *
 * Useful for connecting to various APIs with websocket endpoints, which is common for stock market
 * and crypto data providers.
 */
@ClientEndpoint
@Slf4j
public class WebsocketClientEndpoint {
    Session session = null;
    private MessageHandler messageHandler;
    private OpenHandler openHandler;

    public WebsocketClientEndpoint(URI endpointURI) {
        try {
            WebSocketContainer container = ContainerProvider.getWebSocketContainer();
            container.connectToServer(this, endpointURI);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * Callback hook for Connection open events.
     *
     * @param userSession the userSession which is opened.
     */
    @OnOpen
    public void onOpen(Session userSession) {
        log.info("opening websocket");
        this.session = userSession;
        if (this.openHandler != null) {
            this.openHandler.handleOpen();
        }
    }

    /**
     * Callback hook for Connection close events.
     *
     * @param userSession the userSession which is getting closed.
     * @param reason the reason for connection close
     */
    @OnClose
    public void onClose(Session userSession, CloseReason reason) {
        log.info("closing websocket");
        this.session = null;
    }

    @OnError
    public void onError(Session session, Throwable t) {
        t.printStackTrace();
    }

    /**
     * Callback hook for Message Events. This method will be invoked when a client send a message.
     */
    @OnMessage
    public void onMessage(String message) {
        if (this.messageHandler != null) {
            this.messageHandler.handleMessage(message);
        }
    }

    /**
     * register message handler
     *
     * @param msgHandler
     */
    public void addMessageHandler(MessageHandler msgHandler) {
        this.messageHandler = msgHandler;
    }

    /**
     * Send a message.
     */
    public void sendMessage(String message) {
        this.session.getAsyncRemote().sendText(message);
    }

    /**
     * Message handler.
     */
    public static interface MessageHandler {
        public void handleMessage(String message);
    }

    /**
     * Open handler
     */
    public static interface OpenHandler {
        public void handleOpen();
    }
}
