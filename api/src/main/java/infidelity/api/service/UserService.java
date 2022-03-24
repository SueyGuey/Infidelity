package infidelity.api.service;

import infidelity.api.data.User;
import infidelity.api.data.model.UserData;
import infidelity.api.data.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.cognitoidentityprovider.CognitoIdentityProviderClient;
import software.amazon.awssdk.services.cognitoidentityprovider.model.AdminDeleteUserRequest;

import java.util.Optional;

@Service
@Slf4j
public class UserService {
    @Autowired
    private UserRepository userRepository;

    private CognitoIdentityProviderClient cognito;

    public Optional<User> findUserById(String id) {
        return userRepository.findById(id);
    }

    public User getUserById(String id) throws IllegalArgumentException {
        return findUserById(id).orElseThrow(() -> new IllegalArgumentException("Could not find user with id " + id));
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public User createUser(UserData data) {
        User newUser = User.builder()
                .username(data.getUsername())
                .email(data.getEmail())
                .build();
        userRepository.save(newUser);
        return newUser;
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
     * @return true upon successful deletion from both the database and AWS cognito
     */
    public boolean deleteUser(String username) {
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
        return true;
    }
}
