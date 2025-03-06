package uit.ac.ma.est.kessabpro.services.contracts;

import uit.ac.ma.est.kessabpro.models.entities.AnimalCategory;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface IAnimalCategoryService {
    AnimalCategory createCategory(AnimalCategory category);
    Optional<AnimalCategory> getCategoryById(UUID id);
    List<AnimalCategory> getAllCategories();
    AnimalCategory updateCategory(UUID id, AnimalCategory category);
    boolean deleteCategory(UUID id);
}
