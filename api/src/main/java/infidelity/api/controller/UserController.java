package infidelity.api.controller;

import infidelity.api.data.User;
import infidelity.api.data.model.UserData;
import infidelity.api.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;

@RestController
@RequestMapping(path = "/users")
@Slf4j
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/{id}")
    public UserData getUser(@PathVariable("id") String id) {
        Optional<User> user = userService.findUserById(id);
        return user.get().toData();
    }
}