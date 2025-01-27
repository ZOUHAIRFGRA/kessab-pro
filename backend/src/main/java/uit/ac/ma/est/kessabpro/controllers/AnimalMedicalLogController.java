package uit.ac.ma.est.kessabpro.controllers;

import uit.ac.ma.est.kessabpro.models.entities.AnimalMedicalLog;
import uit.ac.ma.est.kessabpro.services.implementations.AnimalMedicalLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/animal-medical-logs")
public class AnimalMedicalLogController {

    @Autowired
    private AnimalMedicalLogService animalMedicalLogService;

    @PostMapping
    public ResponseEntity<AnimalMedicalLog> createAnimalMedicalLog(@RequestBody AnimalMedicalLog animalMedicalLog) {
        AnimalMedicalLog savedLog = animalMedicalLogService.save(animalMedicalLog);
        return ResponseEntity.ok(savedLog);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AnimalMedicalLog> getAnimalMedicalLogById(@PathVariable UUID id) {
        Optional<AnimalMedicalLog> log = animalMedicalLogService.findById(id);
        return log.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<AnimalMedicalLog>> getAllAnimalMedicalLogs() {
        List<AnimalMedicalLog> logs = animalMedicalLogService.findAll();
        return ResponseEntity.ok(logs);
    }

    @GetMapping("/animal/{animalId}")
    public ResponseEntity<List<AnimalMedicalLog>> getLogsByAnimalId(@PathVariable UUID animalId) {
        List<AnimalMedicalLog> logs = animalMedicalLogService.findByAnimalId(animalId);
        return ResponseEntity.ok(logs);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AnimalMedicalLog> updateAnimalMedicalLog(@PathVariable UUID id, @RequestBody AnimalMedicalLog animalMedicalLog) {
        AnimalMedicalLog updatedLog = animalMedicalLogService.update(id, animalMedicalLog);
        return updatedLog != null ? ResponseEntity.ok(updatedLog) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAnimalMedicalLog(@PathVariable UUID id) {
        animalMedicalLogService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
