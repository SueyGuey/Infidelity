package infidelity.api.stockdata.decode;

import lombok.Getter;

@Getter
public class FHCompanyResponse {
    String country;
    String currency;
    String exchange;
    String ipo;
    double marketCapitalization;
    String name;
    String phone;
    double shareOutstanding;
    String ticker;
    String weburl;
    String logo;
    String finnhubIndustry;
}
