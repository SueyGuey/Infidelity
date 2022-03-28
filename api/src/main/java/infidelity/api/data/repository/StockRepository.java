package infidelity.api.data.repository;

import infidelity.api.data.Stock;
import infidelity.api.data.Tradeable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StockRepository extends JpaRepository<Tradeable, String> {
}