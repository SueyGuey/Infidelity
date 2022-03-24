package infidelity.api.security;

import com.nimbusds.jose.jwk.JWK;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class JwkKeyFile {

    private List<JWK> keys;
}
