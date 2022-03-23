package infidelity.api.security;

import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;
import com.google.common.cache.LoadingCache;
import com.google.common.util.concurrent.UncheckedExecutionException;
import infidelity.api.data.User;
import infidelity.api.data.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.Optional;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;

@Component
@Slf4j
public class CognitoUserMetadataExtractor implements CognitoIdTokenProcessor.UserMetadataResolver {

    // 1 hour
    private static final long CACHE_TTL_MINS =
            TimeUnit.MINUTES.convert(1, TimeUnit.HOURS);

    private final UserRepository userRepository;

    private final LoadingCache<String, Optional<UserMetadata>> userMetadataCache = CacheBuilder.newBuilder()
            .expireAfterWrite(CACHE_TTL_MINS, TimeUnit.MINUTES)
            // .maximumSize(100000)
            .build(new CacheLoader<String, Optional<UserMetadata>>() {
                @Override
                public Optional<UserMetadata> load(String cogId) {
                    Optional<UserMetadata> possibleMetadata = loadUserMetadataForId(cogId);
                    if (!possibleMetadata.isPresent()) {
                        log.error("Unable to find User with cogId '{}' - caching resolution for {} minutes",
                                CACHE_TTL_MINS);
                    }
                    return possibleMetadata;
                }
            });

    public CognitoUserMetadataExtractor(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public Optional<UserMetadata> resolveMetadataForUserId(String cogId) {
        try {
            return userMetadataCache.get(cogId);
        } catch (UncheckedExecutionException uee) {
            log.error("Unexpected error while looking up UserMetadata for cogId: {}", cogId, uee.getCause());
        } catch (ExecutionException ee) {
            log.error("Failed to look up UserMetadata thru the configured resolver cogId: {}", cogId, ee.getCause());
        }
        return Optional.empty();
    }

    private Optional<UserMetadata> loadUserMetadataForId(String id) {
        Optional<User> user = userRepository.findById(id);
        return user.map(mmu -> UserMetadata.builder()
                .username(id)
                .email(mmu.getEmail())
                .build());
    }
}
