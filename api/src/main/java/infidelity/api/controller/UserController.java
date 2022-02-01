package infidelity.api.controller;

import infidelity.api.data.User;
import infidelity.api.data.model.UserData;
import infidelity.api.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
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
     * @param id The ID created by AWS Cognito which serves as a mandatory unique identifier for each user
     * @return JSON-friendly UserData object containing basic information about the user.
     */
    @GetMapping("/{id}")
    public ResponseEntity<UserData> getUser(@PathVariable("id") String id) {
        log.info("GET /user/{}", id);
        Optional<User> user = userService.findUserById(id);
        if (user.isPresent()) {
            return new ResponseEntity<>(user.get().toData(), HttpStatus.OK);
        } else {
            log.warn("User {} not found", id);
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}