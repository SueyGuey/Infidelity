package infidelity.api.stockdata;

public class PolygonIO {
    public static final String AV_API_KEY = "Q0G4FHFR9A6BGHPN";
    public static final String POLYGON_API_KEY = "AAR8fAd12mI68kJiZepzGKkw7uABj9py";

    private String timeSeriesURL(String symbol) {
        return "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" + symbol + "&apikey=" + AV_API_KEY;
    }

    private String polygonURL(String symbol) {
        return "https://api.polygon.io/v2/ticker/" + symbol + "/financials?apiKey=" + POLYGON_API_KEY;
    }
}
