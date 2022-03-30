package infidelity.api.data;

import lombok.Getter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Getter
public class Coin extends Tradeable{
    private String name;
}
