package infidelity.api.data.repository;

import infidelity.api.data.Asset;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface AssetRepository extends JpaRepository<Asset, UUID> {
}