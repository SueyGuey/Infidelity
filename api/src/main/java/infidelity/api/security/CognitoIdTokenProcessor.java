package infidelity.api.security;

import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.proc.ConfigurableJWTProcessor;
import org.apache.commons.lang3.BooleanUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Component
public class CognitoIdTokenProcessor {

    private static final String COGNITO_USERNAME_CLAIM = "cognito:username";

    private final JwtAwsConfig jwtConfiguration;
    private final ConfigurableJWTProcessor configurableJWTProcessor;
    private final UserMetadataResolver metadataResolver;

    @Autowired
    public CognitoIdTokenProcessor(JwtAwsConfig jwtConfiguration, ConfigurableJWTProcessor configurableJWTProcessor,
                                   UserMetadataResolver metadataResolver) {
        this.jwtConfiguration = jwtConfiguration;
        this.configurableJWTProcessor = configurableJWTProcessor;
        this.metadataResolver = metadataResolver;
    }

    private String getClaimOrNull(JWTClaimsSet claims, String name) {
        return Optional.ofNullable(claims.getClaims().get(name))
                .map(Object::toString)
                .orElse(null);
    }

    private Boolean getBooleanClaimOrNull(JWTClaimsSet claims, String name) {
        return Optional.ofNullable(claims.getClaims().get(name))
                .map(v -> {
                    if (v instanceof Boolean) {
                        return (Boolean) v;
                    } else {
                        return BooleanUtils.toBoolean(v.toString());
                    }
                }).orElse(null);
    }

    public Authentication authenticate(HttpServletRequest request) throws Exception {
        String accessToken = getJwtFromHeader(request, jwtConfiguration.getHttpHeader());
        if (StringUtils.isBlank(accessToken)) {
            return null;
        }
        JWTClaimsSet claims = parseClaimsFromJwt(accessToken);
        boolean usingIdToken = "id".equals(getClaimOrNull(claims, "token_use"));
        UserMetadata userMetadata = metadataFromClaims(claims);
        String username = getUserNameFrom(claims);
        List<GrantedAuthority> grantedAuthorities = List.of(new SimpleGrantedAuthority("ROLE_USER"));
        LocalDateTime expiry = LocalDateTime.ofInstant(Instant.ofEpochMilli(claims.getExpirationTime().getTime()),
                ZoneOffset.UTC);
        CognitoUser user = new CognitoUser(
                usingIdToken ? CognitoTokenType.id : CognitoTokenType.access,
                username,
//                claims.getSubject(),
                expiry,
                claims,
                userMetadata);
        return new JwtAuthentication(user, claims, grantedAuthorities);
    }

    UserMetadata metadataFromClaims(JWTClaimsSet claims) throws Exception {
        String cogId = claims.getSubject();
        String username = getClaimOrNull(claims, "username");
        String tokenUsage = Optional.ofNullable(claims.getClaims().get("token_use")).map(Object::toString).orElse("access");
        UserMetadata userMetadata = null;
        if ("id".equals(tokenUsage)) {
            // decrypt/populate from an ID token (bypass metadata lookup in cache?)
            return UserMetadata.builder()
                    .username(username)
                    .email(getClaimOrNull(claims, "email"))
                    .emailVerified(getBooleanClaimOrNull(claims, "email_verified"))
                    .build();
        } else {
            return metadataResolver.resolveMetadataForUserId(username)
                    .orElseThrow(() -> new IllegalArgumentException("Unable to find User with username: " + username));
        }
    }

    private String getJwtFromHeader(HttpServletRequest request, String headerName) {
        String token = request.getHeader(headerName);
        if (StringUtils.isBlank(token)) {
            return null;
        }
        return StringUtils.removeStart(token, "Bearer ");
    }

    private JWTClaimsSet parseClaimsFromJwt(String jwt) throws Exception {
        JWTClaimsSet claims = this.configurableJWTProcessor.process(jwt, null);
        validateIssuer(claims);
        verifyIfIdToken(claims);
        String username = getUserNameFrom(claims);
        if (username == null) {
            throw new IllegalArgumentException("Unable to resolve a username/id from JWT!");
        }
        return claims;
    }

    private String getUserNameFrom(JWTClaimsSet claims) {
        if (claims.getClaims().containsKey(jwtConfiguration.getUserNameField())) {
            return claims.getClaims().get(jwtConfiguration.getUserNameField()).toString();
        } else if (claims.getClaims().containsKey(COGNITO_USERNAME_CLAIM)) {
            return claims.getClaims().get(COGNITO_USERNAME_CLAIM).toString();
        } else {
            return null;
        }
    }

    private void verifyIfIdToken(JWTClaimsSet claims) throws Exception {
        if (!claims.getIssuer().equals(this.jwtConfiguration.getCognitoIdentityPoolUrl())) {
            throw new Exception("JWT Token is not an ID Token");
        }
    }

    private void validateIssuer(JWTClaimsSet claims) throws Exception {
        if (!claims.getIssuer().equals(this.jwtConfiguration.getCognitoIdentityPoolUrl())) {
            throw new Exception(String.format("Issuer %s does not match cognito idp %s", claims.getIssuer(), this.jwtConfiguration.getCognitoIdentityPoolUrl()));
        }
    }

    private String getBearerToken(String token) {
        return token.startsWith("Bearer ") ? token.substring("Bearer ".length()) : token;
    }

    public interface UserMetadataResolver {

        Optional<UserMetadata> resolveMetadataForUserId(String cogId);
    }
}
