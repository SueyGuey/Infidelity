package infidelity.api.data.repository;

import infidelity.api.data.ChangingNumber;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChangingNumberRepository extends JpaRepository<ChangingNumber, String> {
}
