package infidelity.api.config;

import io.prometheus.client.CollectorRegistry;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MetricsConfig {

    @Bean
    public static CollectorRegistry collectorRegistry() {
        return CollectorRegistry.defaultRegistry;
    }
}
