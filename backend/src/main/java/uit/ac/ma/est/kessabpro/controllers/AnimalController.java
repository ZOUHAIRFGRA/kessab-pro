package uit.ac.ma.est.kessabpro.controllers;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import uit.ac.ma.est.kessabpro.helpers.UploadHelper;
import uit.ac.ma.est.kessabpro.mappers.AnimalMapper;
import uit.ac.ma.est.kessabpro.models.dto.AnimalDTO;
import uit.ac.ma.est.kessabpro.models.entities.Animal;
import uit.ac.ma.est.kessabpro.services.implementations.AnimalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/animals")
public class AnimalController {

    @Autowired
    private AnimalService animalService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Animal> createAnimal(@ModelAttribute AnimalDTO animalDTO) throws IOException {
        Animal animal = AnimalMapper.toEntity(animalDTO);

        if (animalDTO.isImagesExists()) {
            // Ensure the uploads directory exists
            UploadHelper.createDirIfNotExist(UploadHelper.ANIMAL_IMAGES_UPLOAD_DIR);

            // ✅ Pass animal name to the upload method
            animal.setImagePaths(animalService.uploadAnimalImages(animal.getTag(), animalDTO.getImages()));
        }


        if (!animal.getImagePaths().isEmpty()) {
            // ✅ Use the correct constant and join paths properly
            String url = animal.getImagePaths().get(0);
            Path filePath = Paths.get(UploadHelper.USER_DIR, url);
            Resource resource = new UrlResource(filePath.toUri());
            System.out.println(resource);
        }

        return new ResponseEntity<>(animalService.createAnimal(animal), HttpStatus.CREATED);
    }


    @GetMapping("/{id}")
    public ResponseEntity<Animal> getAnimalById(@PathVariable UUID id) {
        Optional<Animal> animal = animalService.getAnimalById(id);
        return animal.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public List<Animal> getAllAnimals() {
        return animalService.getAllAnimals();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Animal> updateAnimal(@PathVariable UUID id, @RequestBody Animal animal) {
        Animal updatedAnimal = animalService.updateAnimal(id, animal);
        return updatedAnimal != null ? ResponseEntity.ok(updatedAnimal) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAnimal(@PathVariable UUID id) {
        return animalService.deleteAnimal(id) ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
