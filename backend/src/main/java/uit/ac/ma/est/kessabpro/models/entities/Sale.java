package uit.ac.ma.est.kessabpro.models.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import uit.ac.ma.est.kessabpro.enums.PaymentStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import uit.ac.ma.est.kessabpro.events.listeners.SaleListener;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EntityListeners(SaleListener.class)
public class Sale extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @OneToMany(mappedBy = "sale", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Animal> animals = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "buyer_id")
    private Buyer buyer;

    private LocalDate saleDate;
    private BigDecimal agreedAmount;

    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus = PaymentStatus.NOT_PAID;

    @OneToMany(mappedBy = "sale", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Transaction> transactions = new ArrayList<>();

    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    public List<UUID> getAnimalIds() {
        List<UUID> animalIds = new ArrayList<>();
        for (Animal animal : animals) {
            animalIds.add(animal.getId());
        }
        return animalIds;
    }
}
