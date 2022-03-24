package infidelity.api.security;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;
import com.google.common.base.Preconditions;
import com.nimbusds.jose.jwk.JWK;
import net.minidev.json.JSONObject;

import java.io.IOException;
import java.util.Map;

public class JWKJsonDeserializer extends StdDeserializer<JWK> {

    public JWKJsonDeserializer() {
        super(JWK.class);
    }

    @Override
    public JWK deserialize(JsonParser p, DeserializationContext ctxt) throws IOException {
        // JsonNode node = p.getCodec().readTree(p);
        Map<String, Object> map = p.readValueAs(new TypeReference<Map<String, Object>>(){});
        Preconditions.checkNotNull(map, "map");
        JSONObject minidevJson = new JSONObject(map);
        try {
            return JWK.parse(minidevJson);
        } catch (Exception e) {
            throw new IOException("Unable to parse JWK from attributes: " + map.toString(), e);
        }

    }
}
