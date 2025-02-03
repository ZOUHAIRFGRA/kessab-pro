package uit.ac.ma.est.kessabpro.repositories;

import uit.ac.ma.est.kessabpro.models.entities.Animal;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface AnimalRepository extends JpaRepository<Animal, UUID> {
    Optional<Animal> findByTag(String tag);
}
