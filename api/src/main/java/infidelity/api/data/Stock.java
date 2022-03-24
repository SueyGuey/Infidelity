package infidelity.api.data;

import lombok.Getter;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

@Entity
@Getter
public class Stock extends Tradeable {
    @OneToOne
    @JoinColumn(name = "company_name")
    private Company company;
    @OneToOne
    @JoinColumn(name = "volume_number_id")
    private ChangingNumber volume;
}
