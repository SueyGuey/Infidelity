package infidelity.api.data;

import infidelity.api.data.model.UserData;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity(name = "iuser")
@Getter
@Setter
public class User {
    @Id
    @Column(name = "id", nullable = false)
    private String id;
    private String email;

    public UserData toData() {
        return UserData.builder()
                .id(getId())
                .email(getEmail())
                .build();
    }
}
