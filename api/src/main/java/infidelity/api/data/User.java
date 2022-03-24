package infidelity.api.data;

import infidelity.api.data.model.UserData;
import lombok.*;

import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.HashSet;
import java.util.Set;

/**
 * User objects are those stored in the Postgres database and used by the UserService class.
 * Each object is stored in the 'iuser' table because 'user' is a SQL keyword.
 */
@Entity(name = "iuser")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {
    /**
     * Specified by the user at signup, a universally unique Identifier for the user. Cannot be changed, and used
     * to identify and log each user in the database as well as make requests to the API that concern a specific user.
     */
    @Id
    @Column(name = "id", nullable = false)
    private String username;
    private String email;

    @OneToOne
    @JoinColumn(name = "portfolio_id")
    private Portfolio portfolio;

    /**
     * Converts this User to a UserData object that can be passed as a JSON object to the frontend.
     * Use this function when returning User information from an endpoint.
     * @return UserData representation of this User.
     */
    public UserData toData() {
        return UserData.builder()
                .username(getUsername())
                .portfolio(portfolio.toData())
                .email(getEmail())
                .build();
    }
}
