package uit.ac.ma.est.kessabpro.services.implementations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import uit.ac.ma.est.kessabpro.models.entities.AnimalCategory;
import uit.ac.ma.est.kessabpro.models.entities.User;
import uit.ac.ma.est.kessabpro.repositories.AnimalCategoryRepository;
import uit.ac.ma.est.kessabpro.repositories.AnimalIconRepository;
import uit.ac.ma.est.kessabpro.repositories.AnimalRepository;
import uit.ac.ma.est.kessabpro.services.contracts.IAnimalCategoryService;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class AnimalCategoryService implements IAnimalCategoryService {

    @Autowired
    private AnimalCategoryRepository animalCategoryRepository;

    @Autowired
    private AnimalIconRepository animalIconRepository;

    @Autowired
    private AnimalRepository animalRepository;

    private UUID getLoggedInUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated() || authentication.getPrincipal() == "anonymousUser") {
            throw new RuntimeException("No authenticated user found");
        }
        User loggedInUser = (User) authentication.getPrincipal();
        return loggedInUser.getId();
    }

    @Override
    public AnimalCategory createCategory(AnimalCategory category) {
        UUID userId = getLoggedInUserId();
        User user = new User();
        user.setId(userId);
        category.setUser(user);
        return animalCategoryRepository.save(category);
    }

    @Override
    public Optional<AnimalCategory> getCategoryById(UUID id) {
        UUID userId = getLoggedInUserId();
        Optional<AnimalCategory> category = animalCategoryRepository.findById(id);
        if (category.isPresent() && (category.get().getUser() == null || category.get().getUser().getId().equals(userId))) {
            return category;
        }
        return Optional.empty();
    }

    @Override
    public List<AnimalCategory> getAllCategories() {
        UUID userId = getLoggedInUserId();
        List<AnimalCategory> userCategories = animalCategoryRepository.findByUserId(userId);
        List<AnimalCategory> globalCategories = animalCategoryRepository.findByUserId(null);
        userCategories.addAll(globalCategories);
        return userCategories;
    }

    @Override
    public AnimalCategory updateCategory(UUID id, AnimalCategory category) {
        UUID userId = getLoggedInUserId();
        Optional<AnimalCategory> existingCategory = animalCategoryRepository.findByIdAndUserId(id, userId);
        if (existingCategory.isPresent()) {
            if ("Livestock".equalsIgnoreCase(existingCategory.get().getTypeName())) {
                throw new RuntimeException("Cannot edit the Livestock category");
            }
            category.setId(id);
            category.setUser(existingCategory.get().getUser());
            return animalCategoryRepository.save(category);
        }
        return null;
    }

    @Override
    @Transactional
    public boolean deleteCategory(UUID id) {
        UUID userId = getLoggedInUserId();
        Optional<AnimalCategory> category = animalCategoryRepository.findByIdAndUserId(id, userId);
        if (category.isPresent()) {
            if ("Livestock".equalsIgnoreCase(category.get().getTypeName())) {
                throw new RuntimeException("Cannot delete the Livestock category");
            }
            Optional<AnimalCategory> livestockCategory = animalCategoryRepository.findByUser_IdAndTypeName(userId, "Livestock");
            if (livestockCategory.isEmpty()) {
                throw new RuntimeException("User's Livestock category not found; cannot reassign animals");
            }
            animalRepository.reassignCategoryToLivestock(id, livestockCategory.get().getId());
            animalCategoryRepository.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public Optional<AnimalCategory> getGlobalLivestockCategory() {
        return animalCategoryRepository.findByTypeNameAndUserIsNull("Livestock");
    }
}