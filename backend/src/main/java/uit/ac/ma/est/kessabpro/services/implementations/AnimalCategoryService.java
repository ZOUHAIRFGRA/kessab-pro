package uit.ac.ma.est.kessabpro.services.implementations;

import uit.ac.ma.est.kessabpro.models.entities.AnimalCategory;
import uit.ac.ma.est.kessabpro.repositories.AnimalCategoryRepository;
import uit.ac.ma.est.kessabpro.services.interfaces.IAnimalCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class AnimalCategoryService implements IAnimalCategoryService {

    @Autowired
    private AnimalCategoryRepository animalCategoryRepository;

    @Override
    public AnimalCategory createCategory(AnimalCategory category) {
        return animalCategoryRepository.save(category);
    }

    @Override
    public Optional<AnimalCategory> getCategoryById(UUID id) {
        return animalCategoryRepository.findById(id);
    }

    @Override
    public List<AnimalCategory> getAllCategories() {
        return animalCategoryRepository.findAll();
    }

    @Override
    public AnimalCategory updateCategory(UUID id, AnimalCategory category) {
        if (animalCategoryRepository.existsById(id)) {
            category.setId(id);
            return animalCategoryRepository.save(category);
        } else {
            return null; // or throw exception
        }
    }

    @Override
    public boolean deleteCategory(UUID id) {
        if (animalCategoryRepository.existsById(id)) {
            animalCategoryRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }
}
