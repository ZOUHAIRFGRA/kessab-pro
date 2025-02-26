package uit.ac.ma.est.kessabpro.controllers;

import uit.ac.ma.est.kessabpro.models.dto.AnimalActivitiesLogDTO;
import uit.ac.ma.est.kessabpro.services.implementations.AnimalActivitiesLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/animal-activities-logs")
public class AnimalActivitiesLogController {

    @Autowired
    private AnimalActivitiesLogService animalActivitiesLogService;

    @PostMapping
    public ResponseEntity<AnimalActivitiesLogDTO> createAnimalActivitiesLog(@RequestBody AnimalActivitiesLogDTO dto) {
        return ResponseEntity.ok(animalActivitiesLogService.save(dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<AnimalActivitiesLogDTO> getAnimalActivitiesLogById(@PathVariable UUID id) {
        Optional<AnimalActivitiesLogDTO> log = animalActivitiesLogService.findById(id);
        return log.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<AnimalActivitiesLogDTO>> getAllAnimalActivitiesLogs() {
        return ResponseEntity.ok(animalActivitiesLogService.findAll());
    }

    @GetMapping("/animal/{animalId}")
    public ResponseEntity<List<AnimalActivitiesLogDTO>> getLogsByAnimalId(@PathVariable UUID animalId) {
        return ResponseEntity.ok(animalActivitiesLogService.findByAnimalId(animalId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<AnimalActivitiesLogDTO> updateAnimalActivitiesLog(@PathVariable UUID id, @RequestBody AnimalActivitiesLogDTO dto) {
        return ResponseEntity.ok(animalActivitiesLogService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAnimalActivitiesLog(@PathVariable UUID id) {
        animalActivitiesLogService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
