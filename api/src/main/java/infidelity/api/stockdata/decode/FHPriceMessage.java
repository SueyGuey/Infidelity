package infidelity.api.stockdata.decode;

import com.google.gson.annotations.SerializedName;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

@Getter
@ToString
public class FHPriceMessage {
    private List<PriceMessage> data;
    private String type;

    @Getter
    @ToString
    @AllArgsConstructor
    public static class PriceMessage {
        @SerializedName("s")
        private String symbol;
        @SerializedName("p")
        private double price;
        @SerializedName("t")
        private long timestamp;
        @SerializedName("v")
        private double volume;
    }
}
