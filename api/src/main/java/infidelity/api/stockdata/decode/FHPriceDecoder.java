package infidelity.api.stockdata.decode;

public class FHPriceDecoder extends BaseDecoder<FHPriceMessage> {
    public boolean willDecode(String s) {
        return s != null && s.contains("\"data\"");
    }
}