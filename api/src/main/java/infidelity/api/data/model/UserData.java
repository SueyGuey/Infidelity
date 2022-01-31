package infidelity.api.data.model;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserData {
    @NonNull
    private String id;
    private String email;
}
