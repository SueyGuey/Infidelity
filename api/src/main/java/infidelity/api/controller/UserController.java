package infidelity.api.controller;

import infidelity.api.data.User;
import infidelity.api.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

/**
 * REST api controller for User-related requests. Handles user creation,
 * user data retrieval, and user deletion requests from the frontend.
 *
 * These requests are protected by a layer of authentication such that
 * Bearer tokens are required in the request header or else a 403 Forbidden
 * error will be returned.
 */
@RestController
@RequestMapping(path = "/user")
@Slf4j
public class UserController {

    @Autowired
    private UserService userService;

    /**
     * Default endpoint for retrieving user information given their user id.
     * @param id The ID is also the user's username, which serves as a mandatory unique identifier for each user
     * @return JSON-friendly UserData object containing basic information about the user.
     */
    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable("id") String id) {
        log.info("GET /user/{}", id);
        Optional<User> optUser = userService.findUserById(id);
        if (optUser.isPresent()) {
            return new ResponseEntity<>(optUser.get(), HttpStatus.OK);
        } else {
            log.warn("User {} not found", id);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * Endpoint for creating users.
     * Requires that the data object contain at least the username and email of the new user.
     */
    @PostMapping("/create")
    public User createUser(@RequestBody User newUser) {
        log.info("POST /user/create");
        System.out.println(newUser);
        return userService.createUser(newUser);
    }

    /**
     * Completely erase all user data for a particular user given cogId
     */
    @DeleteMapping("/delete/{username}")
    public ResponseEntity<Void> deleteUser(@PathVariable("username") String username) {
        log.info("Request to delete user {}", username);
        userService.deleteUser(username);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}