package infidelity.api.security;

import lombok.*;

@Getter
@AllArgsConstructor
@ToString
@EqualsAndHashCode
@Builder
public class UserMetadata {
    private final String username;
    private final String email;
    private final boolean emailVerified;
}
