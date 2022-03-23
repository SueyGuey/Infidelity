package infidelity.api.service;

import infidelity.api.data.User;
import infidelity.api.data.model.UserData;
import infidelity.api.data.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Slf4j
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public Optional<User> findUserById(String id) {
        return userRepository.findById(id);
    }

    public User getUserById(String id) throws IllegalArgumentException {
        return findUserById(id).orElseThrow(() -> new IllegalArgumentException("Could not find user with id " + id));
    }

    public void saveUser(User user) {
        userRepository.save(user);
    }

    public User createUser(UserData data) {
        User newUser = User.builder()
                .username(data.getUsername())
                .email(data.getEmail())
                .build();
        userRepository.save(newUser);
        return newUser;
    }
}
