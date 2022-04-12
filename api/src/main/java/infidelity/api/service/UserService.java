package infidelity.api.service;

import infidelity.api.data.Portfolio;
import infidelity.api.data.User;
import infidelity.api.data.Watchlist;
import infidelity.api.data.repository.PortfolioRepository;
import infidelity.api.data.repository.UserRepository;
import infidelity.api.data.repository.WatchlistRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.cognitoidentityprovider.CognitoIdentityProviderClient;
import software.amazon.awssdk.services.cognitoidentityprovider.model.AdminDeleteUserRequest;

import java.util.Optional;

/**
 * Service used for performing user related functionality.
 */
@Service
@Slf4j
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PortfolioRepository portfolioRepository;
    @Autowired
    private WatchlistRepository watchlistRepository;

    private CognitoIdentityProviderClient cognito;

    /**
     * Safe function for retrieving user data from the database.
     * @param username Username for the desired User object.
     * @return An Optional User, such that this function can also be used to determine whether
     * a user is present in the database if not certain
     */
    public Optional<User> findUserById(String username) {
        return userRepository.findById(username);
    }

    /**
     * Similar to findUserById but requires that there exists a User with the specified username.
     * @param username Username for the desired User object.
     * @return The User with the specified username
     * @throws IllegalArgumentException if there is no User in the database with the specified username
     */
    public User getUserById(String username) throws IllegalArgumentException {
        return findUserById(username).orElseThrow(() -> new IllegalArgumentException("Could not find user with username " + username));
    }

    /**
     * Saves or creates a new User in the database - uses username property to find the record.
     * This function does NOT ensure records of the Portfolio and Watchlist records belonging to the User
     * are also properly saved - be sure to save everything using its respective repository first.
     * @param user User object to be saved.
     * @return The User as it is represented in the database.
     */
    public User saveUser(User user) {
        if (user.getActivePortfolio() == null) {
            if (user.getPortfolios().size() > 0) {
                user.setActivePortfolio(user.getPortfolios().stream().iterator().next().getName());
            }
        }
        return userRepository.save(user);
    }

    /**
     * Creates a new User from the requested newUser properties.
     * @param newUser A User object that must have the email and username properties initialized.
     * @return The newly created User object as it is stored in the database.
     */
    public User createUser(User newUser) {
        if (newUser.getPortfolios().isEmpty()) {
            Portfolio firstPortfolio = Portfolio.builder()
                    .name("My Portfolio")
                    .balance(100000)
                    .build();
            firstPortfolio = portfolioRepository.save(firstPortfolio);
            newUser.getPortfolios().add(firstPortfolio);
            newUser.setActivePortfolio(firstPortfolio.getName());

            Watchlist firstWatchlist = Watchlist.builder()
                    .name("My Watchlist")
                    .build();
            firstWatchlist = watchlistRepository.save(firstWatchlist);
            newUser.getWatchlists().add(firstWatchlist);
        }
        return saveUser(newUser);
    }

    /**
     * must use key pair with `aws configure` beforehand
     * used only for deleting users from cognito
     * @return client for performing cognito actions
     */
    private CognitoIdentityProviderClient initCognito() {
        log.info("initializing Cognito Identity Provider Client");
        return CognitoIdentityProviderClient.builder()
                .region(Region.US_EAST_1)
                .build();
    }

    /**
     * Removes user from the database and Cognito user pool
     */
    public void deleteUser(String username) {
        // remove user from database
        Optional<User> optUser = findUserById(username);
        if (optUser.isPresent()) {
            userRepository.delete(optUser.get());
        } else {
            log.warn("No record of user \"{}\" found", username);
        }

        // remove user from Cognito
        if (cognito == null) {
            cognito = initCognito();
        }
        String USER_POOL_ID = "us-east-1_dxaGZOwSL";
        cognito.adminDeleteUser(
                AdminDeleteUserRequest.builder()
                        .userPoolId(USER_POOL_ID)
                        .username(username)
                        .build());
    }
}
