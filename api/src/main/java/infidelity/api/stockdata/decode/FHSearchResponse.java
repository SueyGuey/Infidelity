package infidelity.api.stockdata.decode;

import lombok.Getter;

@Getter
public class FHSearchResponse {
    int count = 0;
    FHSearchResult[] result;

    @Getter
    public class FHSearchResult {
        String description;
        String displaySymbol;
        String symbol;
        String type;
    }
}
