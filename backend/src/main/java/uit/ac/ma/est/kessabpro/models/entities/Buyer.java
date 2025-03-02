package uit.ac.ma.est.kessabpro.models.entities;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.beans.factory.annotation.Autowired;
import uit.ac.ma.est.kessabpro.services.implementations.AuthService;
import uit.ac.ma.est.kessabpro.services.interfaces.IAuthService;

import java.util.UUID;
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Buyer extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;


    private String fullName;
    private String CIN;
    private String phone;
    private String address;
   


}
