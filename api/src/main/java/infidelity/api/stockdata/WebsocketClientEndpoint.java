package infidelity.api.stockdata;

import lombok.extern.slf4j.Slf4j;

import javax.websocket.*;
import java.io.IOException;
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
    private CloseHandler closeHandler;

    public WebsocketClientEndpoint(URI endpointURI) throws DeploymentException, IOException {
        WebSocketContainer container = ContainerProvider.getWebSocketContainer();
        container.connectToServer(this, endpointURI);
    }

    /**
     * Callback hook for Connection open events.
     *
     * @param userSession the userSession which is opened.
     */
    @OnOpen
    public void onOpen(Session userSession) {
        log.info("New session opened: {}", userSession.getId());
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
        log.info("Session " + userSession.getId() + " closed because of " + reason.getReasonPhrase());
        if (userSession.getId().equals(this.session.getId())) {
            this.session = null;
        }
        if (this.closeHandler != null) {
            this.closeHandler.handleClose();
        }
    }

    @OnError
    public void onError(Session session, Throwable t) {
        log.error("Error in websocket connection session {}: {}", session.getId(), t.getMessage());
        t.printStackTrace();
    }

    /**
     * Callback hook for Message Events. This method will be invoked when a client send a message.
     */
    @OnMessage
    public void onMessage(String message) {
//        log.info("Received message (session id {}): {}", this.session.getId(), message);
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

    public void addCloseHandler(CloseHandler closeHandler) {
        this.closeHandler = closeHandler;
    }

    /**
     * Send a message.
     */
    public void sendMessage(String message) {
        log.info("Sending message (session id {}): {}", this.session.getId(), message);
        this.session.getAsyncRemote().sendText(message);
    }

    /**
     * Message handler.
     */
    public static interface MessageHandler {
        public void handleMessage(String message);
    }

    public static interface OpenHandler {
        public void handleOpen();
    }

    public static interface CloseHandler {
        public void handleClose();
    }
}
