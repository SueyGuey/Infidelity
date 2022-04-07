package infidelity.api.stockdata.decode;

import com.google.gson.Gson;

import javax.websocket.Decoder;
import javax.websocket.EndpointConfig;
import java.lang.reflect.ParameterizedType;

public abstract class BaseDecoder<T> implements Decoder.Text<T> {

    private static final Gson gson = new Gson();

    @Override
    @SuppressWarnings("unchecked")
    public T decode(String s) {
        Class<T> type = ((Class<T>) ((ParameterizedType) getClass()
                .getGenericSuperclass()).getActualTypeArguments()[0]);
        return gson.fromJson(s, type);
    }

    @Override
    public abstract boolean willDecode(String s);

    @Override
    public void init(EndpointConfig endpointConfig) {
        // no-op
    }

    @Override
    public void destroy() {
        // no-op
    }
}