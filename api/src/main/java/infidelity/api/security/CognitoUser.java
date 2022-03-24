package infidelity.api.security;

import com.nimbusds.jwt.JWTClaimsSet;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

import javax.annotation.Nullable;
import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@ToString
@EqualsAndHashCode
public class CognitoUser {
    private final CognitoTokenType tokenType;
    private final String username;
    private final LocalDateTime expiry;
    private final JWTClaimsSet claims;

    @Nullable
    private final UserMetadata metadata;

    public CognitoUser(CognitoTokenType tokenType, String username, LocalDateTime expiry, JWTClaimsSet claims) {
        this(tokenType, username, expiry, claims, null);
    }

    public boolean hasMetadata() {
        return metadata != null;
    }
}
