package infidelity.api.data.repository;

import infidelity.api.data.LeaderboardPortfolio;
import infidelity.api.data.Portfolio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface PortfolioRepository extends JpaRepository<Portfolio, String> {
}
