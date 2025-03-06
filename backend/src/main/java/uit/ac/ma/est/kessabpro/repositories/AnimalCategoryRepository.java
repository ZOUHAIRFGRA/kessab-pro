package uit.ac.ma.est.kessabpro.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import uit.ac.ma.est.kessabpro.models.entities.AnimalCategory;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface AnimalCategoryRepository extends JpaRepository<AnimalCategory, UUID> {

    Optional<AnimalCategory> findByUser_IdAndTypeName(UUID userId, String typeName);

    Optional<AnimalCategory> findByTypeName(String typeName);
    Optional<AnimalCategory> findByIdAndUserId(UUID id, UUID userId);

    List<AnimalCategory> findByUserId(UUID userId);

    Optional<AnimalCategory> findByTypeNameAndUserIsNull(String typeName);
}