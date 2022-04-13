package infidelity.api.stockdata.decode;

public class FHCompanyDecoder extends BaseDecoder<FHCompanyResponse> {
    @Override
    public boolean willDecode(String s) {
        return s != null && s.contains("\"ticker\"") && s.contains("\"name\"");
    }
}
