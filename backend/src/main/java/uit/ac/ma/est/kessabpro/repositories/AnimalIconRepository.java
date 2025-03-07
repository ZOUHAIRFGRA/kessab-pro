package uit.ac.ma.est.kessabpro.repositories;

import uit.ac.ma.est.kessabpro.models.entities.AnimalIcon;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AnimalIconRepository extends JpaRepository<AnimalIcon, Long> {

    Optional<AnimalIcon> findByIconPath(String s);
}
