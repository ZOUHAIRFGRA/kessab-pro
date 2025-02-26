package uit.ac.ma.est.kessabpro.models.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AnimalMedicalLogDTO {
    private UUID id;
    private UUID animalId;
    private LocalDate logDate;
    private String description;
    private String vetName;
}
