package infidelity.api.controller;

import infidelity.api.data.User;
import infidelity.api.data.model.UserData;
import infidelity.api.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;

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
    public void createUser(@RequestBody User newUser) {
        log.info("POST /user/create");
        System.out.println(newUser);
        userService.saveUser(newUser);
    }
}