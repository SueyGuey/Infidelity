package infidelity.api.data;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

/**
 * A collection of generally static information about a company
 */
@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Company {
    @Id
    @Column(name = "name", nullable = false)
    private String name;
    private String description;
    private String weburl;
    private String industry;
}
