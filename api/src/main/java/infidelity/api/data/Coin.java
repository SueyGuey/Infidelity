package infidelity.api.data;

import javax.persistence.Column;
import javax.persistence.Id;

public class Coin extends Tradeable{
    @Id
    @Column(nullable = false)
    private String name;
}
