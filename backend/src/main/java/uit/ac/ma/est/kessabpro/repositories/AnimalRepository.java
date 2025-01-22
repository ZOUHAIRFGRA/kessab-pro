package uit.ac.ma.est.kessabpro.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import uit.ac.ma.est.kessabpro.models.entities.Animal;

import java.util.UUID;

public interface AnimalRepository extends JpaRepository<Animal, UUID> {
}
