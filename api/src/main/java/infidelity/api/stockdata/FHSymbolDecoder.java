package infidelity.api.stockdata;

import com.google.gson.Gson;

import javax.websocket.Decoder;
import javax.websocket.EndpointConfig;

public class FHSymbolDecoder implements Decoder.Text<FHSymbolResponse[]> {

    private static final Gson gson = new Gson();

    @Override
    public FHSymbolResponse[] decode(String s) {
        return gson.fromJson(s, FHSymbolResponse[].class);
    }

    @Override
    public boolean willDecode(String s) {
        return s != null && s.contains("\"symbol\"");
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