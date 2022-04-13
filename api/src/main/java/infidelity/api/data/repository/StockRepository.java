package infidelity.api.data.repository;

import infidelity.api.data.Tradeable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface StockRepository extends JpaRepository<Tradeable, String> {
    @Query(nativeQuery = true, value = "SELECT * FROM tradeable ORDER BY popularity DESC LIMIT ?1")
    List<Tradeable> findTopByPopularity(int limit);
}