package uit.ac.ma.est.kessabpro.controllers;

import uit.ac.ma.est.kessabpro.models.entities.AnimalIcon;
import uit.ac.ma.est.kessabpro.services.implementations.AnimalIconService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/animal-icons")
public class AnimalIconController {

    @Autowired
    private AnimalIconService animalIconService;

    @PostMapping
    public ResponseEntity<AnimalIcon> createAnimalIcon(@RequestBody AnimalIcon animalIcon) {
        AnimalIcon savedIcon = animalIconService.save(animalIcon);
        return ResponseEntity.ok(savedIcon);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AnimalIcon> getAnimalIconById(@PathVariable Long id) {
        Optional<AnimalIcon> icon = animalIconService.findById(id);
        return icon.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<AnimalIcon>> getAllAnimalIcons() {
        List<AnimalIcon> icons = animalIconService.findAll();
        return ResponseEntity.ok(icons);
    }

    // Change UUID to Long for ID
    @PutMapping("/{id}")
    public ResponseEntity<AnimalIcon> updateAnimalIcon(@PathVariable Long id, @RequestBody AnimalIcon animalIcon) {
        AnimalIcon updatedIcon = animalIconService.update(id, animalIcon);
        return updatedIcon != null ? ResponseEntity.ok(updatedIcon) : ResponseEntity.notFound().build();
    }

    // Change UUID to Long for ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAnimalIcon(@PathVariable Long id) {
        animalIconService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
