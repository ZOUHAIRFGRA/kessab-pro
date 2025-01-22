package uit.ac.ma.est.kessabpro.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import uit.ac.ma.est.kessabpro.models.entities.Sale;

import java.util.UUID;

public interface SaleRepository extends JpaRepository<Sale, UUID> {

}
