package uit.ac.ma.est.kessabpro.models.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Data  // @Data already includes @Getter, @Setter, @ToString, etc.
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AnimalActivitiesLog {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "animal_id")
    private Animal animal;

    private LocalDate logDate;
    private String activity;

    @CreatedDate
    private LocalDateTime createdAt;
}
