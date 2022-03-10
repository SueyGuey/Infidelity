package infidelity.api.data;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.LocalDate;

/**
 * User objects are those stored in the Postgres database and used by the UserService class.
 * Each object is stored in the 'iuser' table because 'user' is a SQL keyword.
 */
@Entity
@Getter
@Setter
public class Portfolio {
    @Id
    @Column(name = "id", nullable = false)
    private String id;
    private String name;
    private LocalDate createdAt;

    private int money;
}
