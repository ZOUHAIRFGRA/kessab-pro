package uit.ac.ma.est.kessabpro.models.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Filter;
import org.springframework.data.annotation.CreatedDate;
import uit.ac.ma.est.kessabpro.auditing.UserAware;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Filter(name = "userFilter", condition = "user_id = :userId")
public class AnimalCategory extends BaseEntity implements UserAware {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    private String typeName;

    @ManyToOne
    @JoinColumn(name = "icon_id")
    private AnimalIcon icon;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;


}
