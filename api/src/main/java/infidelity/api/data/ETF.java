package infidelity.api.data;

import lombok.Getter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Getter
public class ETF extends Tradeable{
    @Column(nullable = false)
    private String name;
}
