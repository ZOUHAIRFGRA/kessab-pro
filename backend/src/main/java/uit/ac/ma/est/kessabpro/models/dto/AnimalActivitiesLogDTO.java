package uit.ac.ma.est.kessabpro.models.dto;

import lombok.*;

import java.time.LocalDate;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AnimalActivitiesLogDTO {
    private UUID id;
    private UUID animalId;
    private LocalDate logDate;
    private String activity;
}
