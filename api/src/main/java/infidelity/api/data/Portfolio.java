package infidelity.api.data;

import infidelity.api.data.model.PortfolioData;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Getter
@Setter
public class Portfolio {
    @Id
    @Column(name = "id", nullable = false)
    private String id;

    private String name;
    private double money;

    public PortfolioData toData() {
        return PortfolioData.builder()
                .id(id)
                .name(name)
                .money(money)
                .build();
    }
}
