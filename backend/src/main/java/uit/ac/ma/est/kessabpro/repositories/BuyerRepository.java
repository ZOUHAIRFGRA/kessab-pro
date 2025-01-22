package uit.ac.ma.est.kessabpro.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import uit.ac.ma.est.kessabpro.models.entities.Buyer;

import java.util.UUID;

public interface BuyerRepository extends JpaRepository<Buyer, UUID> {
}
