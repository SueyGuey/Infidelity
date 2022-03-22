package infidelity.api.data;

import infidelity.api.data.model.UserData;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/health")
@Slf4j
public class HealthController {
    @GetMapping
    public ResponseEntity<String> health() {
        return new ResponseEntity<>("healthy", HttpStatus.OK);
    }
}
