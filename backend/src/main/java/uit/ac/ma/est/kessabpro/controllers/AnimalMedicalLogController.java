package uit.ac.ma.est.kessabpro.controllers;

import uit.ac.ma.est.kessabpro.models.dto.AnimalMedicalLogDTO;
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
    public ResponseEntity<AnimalMedicalLogDTO> createAnimalMedicalLog(@RequestBody AnimalMedicalLogDTO dto) {
       return ResponseEntity.ok(animalMedicalLogService.save(dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<AnimalMedicalLogDTO> getAnimalMedicalLogById(@PathVariable UUID id) {
        Optional<AnimalMedicalLogDTO> log = animalMedicalLogService.findById(id);
        return log.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<AnimalMedicalLogDTO>> getAllAnimalMedicalLogs() {
        List<AnimalMedicalLogDTO> logs = animalMedicalLogService.findAll();
        return ResponseEntity.ok(logs);
    }

    @GetMapping("/animal/{animalId}")
    public ResponseEntity<List<AnimalMedicalLogDTO>> getLogsByAnimalId(@PathVariable UUID animalId) {
        List<AnimalMedicalLogDTO> logs = animalMedicalLogService.findByAnimalId(animalId);
        return ResponseEntity.ok(logs);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AnimalMedicalLogDTO> updateAnimalMedicalLog(@PathVariable UUID id, @RequestBody AnimalMedicalLogDTO animalMedicalLogDTO) {
        AnimalMedicalLogDTO updatedLog = animalMedicalLogService.update(id, animalMedicalLogDTO);
        return updatedLog != null ? ResponseEntity.ok(updatedLog) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAnimalMedicalLog(@PathVariable UUID id) {
        animalMedicalLogService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
