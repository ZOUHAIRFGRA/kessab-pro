package uit.ac.ma.est.kessabpro.controllers;

import uit.ac.ma.est.kessabpro.models.entities.AnimalCategory;
import uit.ac.ma.est.kessabpro.services.implementations.AnimalCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/animal-categories")
public class AnimalCategoryController {

    @Autowired
    private AnimalCategoryService animalCategoryService;

    @PostMapping
    public ResponseEntity<AnimalCategory> createCategory(@RequestBody AnimalCategory category) {
        return new ResponseEntity<>(animalCategoryService.createCategory(category), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AnimalCategory> getCategoryById(@PathVariable UUID id) {
        Optional<AnimalCategory> category = animalCategoryService.getCategoryById(id);
        return category.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public List<AnimalCategory> getAllCategories() {
        return animalCategoryService.getAllCategories();
    }

    @PutMapping("/{id}")
    public ResponseEntity<AnimalCategory> updateCategory(@PathVariable UUID id, @RequestBody AnimalCategory category) {
        AnimalCategory updatedCategory = animalCategoryService.updateCategory(id, category);
        return updatedCategory != null ? ResponseEntity.ok(updatedCategory) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable UUID id) {
        return animalCategoryService.deleteCategory(id) ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
