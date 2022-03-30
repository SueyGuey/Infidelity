package infidelity.api.data.model;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PortfolioData {
    @NonNull
    private String id;
    private String name;
    private double money;
}
