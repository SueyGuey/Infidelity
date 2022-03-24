package infidelity.api.stockdata;

import com.google.gson.Gson;

import javax.websocket.Decoder;
import javax.websocket.EndpointConfig;

public class FHMessageDecoder implements Decoder.Text<FinnHubMessage> {

    private static final Gson gson = new Gson();

    @Override
    public FinnHubMessage decode(String s) {
        return gson.fromJson(s, FinnHubMessage.class);
    }

    @Override
    public boolean willDecode(String s) {
        return s != null && s.contains("\"data\"");
    }

    @Override
    public void init(EndpointConfig endpointConfig) {
        // Custom initialization logic
    }

    @Override
    public void destroy() {
        // Close resources
    }
}