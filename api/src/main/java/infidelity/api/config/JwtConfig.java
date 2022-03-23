package infidelity.api.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jose.jwk.source.JWKSource;
import com.nimbusds.jose.jwk.source.RemoteJWKSet;
import com.nimbusds.jose.proc.JWSKeySelector;
import com.nimbusds.jose.proc.JWSVerificationKeySelector;
import com.nimbusds.jose.util.DefaultResourceRetriever;
import com.nimbusds.jose.util.ResourceRetriever;
import com.nimbusds.jwt.proc.ConfigurableJWTProcessor;
import com.nimbusds.jwt.proc.DefaultJWTProcessor;
import infidelity.api.security.JwtAwsConfig;
import infidelity.api.security.JwtHelper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;

@Configuration
@Slf4j
public class JwtConfig {

    @Bean
    @Profile("!test && !local")
    public JWKSource remoteJwkSource(JwtAwsConfig jwtAwsConfig) throws MalformedURLException {
        ResourceRetriever resourceRetriever =
                new DefaultResourceRetriever(jwtAwsConfig.getConnectionTimeout(), jwtAwsConfig.getReadTimeout());
        log.info("Using remote JWK key source with URL: {}", jwtAwsConfig.getJwkUrl());
        URL jwkUrl = new URL(jwtAwsConfig.getJwkUrl());
        JWKSource jwkSource = new RemoteJWKSet(jwkUrl, resourceRetriever);
        return jwkSource;
    }

    @Bean
    @Profile("test || local")
    public JWKSource localJwkSource(ResourceLoader resourceLoader, ObjectMapper objectMapper) throws IOException {
        Resource resource = resourceLoader.getResource("classpath:jwk_keys.txt");
        log.info("Using local JWT key source with source location: {}", resource.getURL());
        String jwkFileContents = JwtHelper.readJwkContents(resource);
        return JwtHelper.localJwkSource(jwkFileContents, objectMapper);
    }


    @Bean
    public ConfigurableJWTProcessor configurableJWTProcessor(JWKSource jwkSource) {
        ConfigurableJWTProcessor jwtProcessor = new DefaultJWTProcessor();
        JWSKeySelector keySelector = new JWSVerificationKeySelector(JWSAlgorithm.RS256, jwkSource);
        jwtProcessor.setJWSKeySelector(keySelector);
        return jwtProcessor;
    }
}
