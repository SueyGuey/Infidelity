package infidelity.api.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.base.Charsets;
import com.nimbusds.jose.jwk.JWK;
import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.source.ImmutableJWKSet;
import com.nimbusds.jose.jwk.source.JWKSource;
import org.apache.commons.io.IOUtils;
import org.springframework.core.io.Resource;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.List;
import java.util.stream.Collectors;

public class JwtHelper {

    public static JWKSource localJwkSource(String jwkFileContents, ObjectMapper objectMapper) {
        List<JWK> keys;
        try {
            JwkKeyFile keyFile = objectMapper.readValue(jwkFileContents, JwkKeyFile.class);
            keys = keyFile.getKeys();
        } catch (Exception e) {
            throw new IllegalArgumentException("Unable to process JWK key file contents: " + jwkFileContents, e);
        }
        if (keys.isEmpty()) {
            throw new IllegalStateException("Expected one or more JWK keys but found none inside JWK key file JSON:\n" + jwkFileContents);
        }
        JWKSet jwkSet = new JWKSet(keys.stream()
                .map(JWK.class::cast)
                .collect(Collectors.toList()));
        ImmutableJWKSet jwkSource = new ImmutableJWKSet(jwkSet);
        return jwkSource;
    }

    public static JWKSource localJwkSourceFromUrl(String jwkFileUrl, ObjectMapper objectMapper)
            throws IOException, MalformedURLException {
        InputStream jwkFileStream = Thread.currentThread().getContextClassLoader().getResourceAsStream(jwkFileUrl);
        if (jwkFileStream == null) {
            try {
                if (jwkFileUrl.contains("://")) {
                    jwkFileStream = new URL(jwkFileUrl).openStream();
                } else {
                    jwkFileStream = new FileInputStream(jwkFileUrl);
                }
            } catch (Exception e) {
                throw new IOException("Unable to open stream for JWK source URL: " + jwkFileUrl, e);
            }
        }
        String jwkFileContents = readJwkContents(jwkFileStream);
        try {
            return localJwkSource(jwkFileContents, objectMapper);
        } catch (Exception e) {
            throw new IOException("Unable to parse contents of JWK key file from URL: " + jwkFileUrl, e);
        }
    }

    public static String readJwkContents(Resource resource) throws IOException {
        if (!resource.exists()) {
            throw new FileNotFoundException("Unable to find local JWK keyset in classpath: " + resource);
        }
        return readJwkContents(resource.getInputStream());
    }

    private static String readJwkContents(InputStream is) throws IOException {
        try {
            return IOUtils.toString(is, Charsets.UTF_8);
        } finally {
            IOUtils.closeQuietly(is);
        }
    }

    private JwtHelper() {
        // helper methods only
    }
}
