package infidelity.api.stockdata.decode;

import com.google.gson.annotations.SerializedName;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class FHQuoteResponse {
    @SerializedName("c")
    private double currentPrice;
    @SerializedName("d")
    private double change;
    @SerializedName("dp")
    private double changePercent;
    @SerializedName("h")
    private double high;
    @SerializedName("l")
    private double low;
    @SerializedName("o")
    private double open;
    @SerializedName("pc")
    private double previousClose;
    @SerializedName("t")
    private long timestampSeconds;
}
