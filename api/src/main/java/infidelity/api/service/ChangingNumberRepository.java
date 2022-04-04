package infidelity.api.service;

import infidelity.api.data.ChangingNumber;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ChangingNumberRepository extends JpaRepository<ChangingNumber, UUID> {
}
