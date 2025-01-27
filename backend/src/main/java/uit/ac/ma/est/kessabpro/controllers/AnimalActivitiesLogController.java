package uit.ac.ma.est.kessabpro.controllers;

import uit.ac.ma.est.kessabpro.models.entities.AnimalActivitiesLog;
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
    public ResponseEntity<AnimalActivitiesLog> createAnimalActivitiesLog(@RequestBody AnimalActivitiesLog animalActivitiesLog) {
        AnimalActivitiesLog savedLog = animalActivitiesLogService.save(animalActivitiesLog);
        return ResponseEntity.ok(savedLog);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AnimalActivitiesLog> getAnimalActivitiesLogById(@PathVariable UUID id) {
        Optional<AnimalActivitiesLog> log = animalActivitiesLogService.findById(id);
        return log.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<AnimalActivitiesLog>> getAllAnimalActivitiesLogs() {
        List<AnimalActivitiesLog> logs = animalActivitiesLogService.findAll();
        return ResponseEntity.ok(logs);
    }

    @GetMapping("/animal/{animalId}")
    public ResponseEntity<List<AnimalActivitiesLog>> getLogsByAnimalId(@PathVariable UUID animalId) {
        List<AnimalActivitiesLog> logs = animalActivitiesLogService.findByAnimalId(animalId);
        return ResponseEntity.ok(logs);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AnimalActivitiesLog> updateAnimalActivitiesLog(@PathVariable UUID id, @RequestBody AnimalActivitiesLog animalActivitiesLog) {
        AnimalActivitiesLog updatedLog = animalActivitiesLogService.update(id, animalActivitiesLog);
        return updatedLog != null ? ResponseEntity.ok(updatedLog) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAnimalActivitiesLog(@PathVariable UUID id) {
        animalActivitiesLogService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
