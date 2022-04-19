package infidelity.api.stockdata.decode;

public class FHQuoteDecoder extends BaseDecoder<FHQuoteResponse> {
    @Override
    public boolean willDecode(String s) {
        return s != null && s.contains("\"c\"") && s.contains("\"t\"");
    }
}
