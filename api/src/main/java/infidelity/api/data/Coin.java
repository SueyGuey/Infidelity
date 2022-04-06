package infidelity.api.data;

import lombok.Getter;

import javax.persistence.Entity;

@Entity
@Getter
public class Coin extends Tradeable{
    private String name;
}
