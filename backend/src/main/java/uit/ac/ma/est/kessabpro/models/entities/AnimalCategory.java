package uit.ac.ma.est.kessabpro.models.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AnimalCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    private String typeName;

    @ManyToOne
    @JoinColumn(name = "icon_id")
    private AnimalIcon icon;

    @CreatedDate
    private LocalDateTime createdAt;
}
