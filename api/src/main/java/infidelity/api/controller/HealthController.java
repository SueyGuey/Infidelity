package infidelity.api.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * This REST api controller is purely to see if requests can be made to whatever is hosting the API.
 * The mapping function has practically zero processing time, so if this endpoint is slow then something's wrong
 * with the host. Very useful for debugging SSL/HTTPS, CORS, Content restrictions, and other strange errors that
 * come with connecting the frontend and backend in a production environment.
 */
@RestController
@RequestMapping(path = "/health")
@Slf4j
public class HealthController {
    @GetMapping
    public ResponseEntity<String> health() {
        return new ResponseEntity<>("healthy", HttpStatus.OK);
    }
}
