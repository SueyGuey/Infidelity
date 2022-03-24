package infidelity.api.data.repository;

import infidelity.api.data.Stock;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StockRepository extends JpaRepository<Stock, String> {
}