package uit.ac.ma.est.kessabpro.models.entities;

import lombok.*;
import org.hibernate.annotations.Filter;
import uit.ac.ma.est.kessabpro.auditing.UserAware;
import uit.ac.ma.est.kessabpro.enums.PaymentMethod;
import jakarta.persistence.*;
import org.springframework.data.annotation.CreatedDate;
import uit.ac.ma.est.kessabpro.listeners.transaction.TransactionCreatedEventListener;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Filter(name = "userFilter", condition = "user_id = :userId")
public class Transaction extends BaseEntity implements UserAware {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "sale_id")
    private Sale sale;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;



    private LocalDate transactionDate;
    private double amount;

    @Enumerated(EnumType.STRING)
    private PaymentMethod method;

    @Version
    private Integer version;

}

