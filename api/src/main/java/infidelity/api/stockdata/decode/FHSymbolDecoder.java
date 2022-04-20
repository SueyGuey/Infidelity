package infidelity.api.stockdata.decode;

public class FHSymbolDecoder extends BaseDecoder<FHSymbolResponse[]> {
    @Override
    public boolean willDecode(String s) {
        return s != null && s.contains("\"symbol\"");
    }
}