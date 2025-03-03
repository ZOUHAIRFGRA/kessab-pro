package uit.ac.ma.est.kessabpro.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.NoRepositoryBean;
import uit.ac.ma.est.kessabpro.models.entities.Animal;
import uit.ac.ma.est.kessabpro.models.entities.Buyer;

import java.util.UUID;

public interface BuyerRepository extends UserAwareRepository<Buyer,UUID> {
}