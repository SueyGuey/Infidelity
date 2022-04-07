package infidelity.api.stockdata;

import com.google.gson.Gson;

import javax.websocket.Decoder;
import javax.websocket.EndpointConfig;

public class FHPriceDecoder implements Decoder.Text<FHPriceMessage> {

    private static final Gson gson = new Gson();

    @Override
    public FHPriceMessage decode(String s) {
        return gson.fromJson(s, FHPriceMessage.class);
    }

    @Override
    public boolean willDecode(String s) {
        return s != null && s.contains("\"data\"");
    }

    @Override
    public void init(EndpointConfig endpointConfig) {
        // no-op
    }

    @Override
    public void destroy() {
        // no-op
    }
}