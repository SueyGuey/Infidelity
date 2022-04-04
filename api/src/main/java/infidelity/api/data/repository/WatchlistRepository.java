package infidelity.api.data.repository;

import infidelity.api.data.Watchlist;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface WatchlistRepository extends JpaRepository<Watchlist, UUID> {
}
