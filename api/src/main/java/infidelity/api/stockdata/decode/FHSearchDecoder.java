package infidelity.api.stockdata.decode;

public class FHSearchDecoder extends BaseDecoder<FHSearchResponse> {
    @Override
    public boolean willDecode(String s) {
        return s != null && s.contains("\"count\"") && s.contains("\"result\"");
    }
}
