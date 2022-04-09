package infidelity.api.data;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.Date;

/**
 * A collection of generally static information about a company. This is used to display information about the company
 * to the user in the frontend when they are viewing the company's stock page.
 * @see Stock
 */
@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Company {
    @Id
    @Column(name = "name")
    private String name;
    private String description;
    private String weburl;
    private String industry;
    private String country;
}
