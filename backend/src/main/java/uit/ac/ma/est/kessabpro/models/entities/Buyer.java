package uit.ac.ma.est.kessabpro.models.entities;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Filter;
import org.hibernate.annotations.FilterDef;
import org.hibernate.annotations.ParamDef;
import uit.ac.ma.est.kessabpro.auditing.UserAware;

import java.util.List;
import java.util.UUID;
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FilterDef(name = "userFilter", parameters = @ParamDef(name = "userId", type = UUID.class))
@Filter(name = "userFilter", condition = "user_id = :userId")
public class Buyer extends BaseEntity implements UserAware {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @OneToMany(mappedBy = "buyer")
    List<Sale> sales;



    private String fullName;
    private String CIN;
    private String phone;
    private String address;
   


}
