package uit.ac.ma.est.kessabpro.seeders;

import jakarta.annotation.PostConstruct;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import uit.ac.ma.est.kessabpro.enums.PaymentMethod;
import uit.ac.ma.est.kessabpro.enums.PaymentStatus;
import uit.ac.ma.est.kessabpro.models.entities.*;
import uit.ac.ma.est.kessabpro.repositories.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;

@Component
public class BuyerSaleTransactionSeeder {

    @Autowired private BuyerRepository buyerRepository;
    @Autowired private UserRepository userRepository;
    @Autowired private AnimalRepository animalRepository;
    @Autowired private SaleRepository saleRepository;
    @Autowired private TransactionRepository transactionRepository;

    @PersistenceContext private EntityManager entityManager;

    @PostConstruct
    public void init() {
        seedData();
    }

    @Transactional
    public void seedData() {
        Optional<User> firstUserOpt = userRepository.findAll().stream().findFirst();
        if (firstUserOpt.isEmpty()) {
            System.out.println("❌ No users found. Please seed users first!");
            return;
        }

        User firstUser = firstUserOpt.get();
        firstUser = entityManager.merge(firstUser);

        if (buyerRepository.count() == 0) {
            Buyer buyer = Buyer.builder()
                    .user(firstUser)
                    .fullName("John Doe")
                    .CIN("AB123456")
                    .phone("0654321987")
                    .address("789 Buyer Street")
                    .createdAt(LocalDateTime.now())
                    .build();

            buyer = buyerRepository.save(buyer);
            System.out.println("✅ Buyer seeded successfully!");

            // Get the first Animal
            Optional<Animal> firstAnimalOpt = animalRepository.findAll().stream().findFirst();
            if (firstAnimalOpt.isEmpty()) {
                System.out.println("❌ No animals found. Please seed animals first!");
                return;
            }
            Animal firstAnimal = firstAnimalOpt.get();

            // Create a Sale linked to Buyer & Animal
            Sale sale = Sale.builder()
                    .animal(firstAnimal)
                    .buyer(buyer)
                    .saleDate(LocalDate.now())
                    .agreedAmount(BigDecimal.valueOf(1500.00))
                    .paymentStatus(PaymentStatus.PARTIALLY_PAID)
                    .createdAt(LocalDateTime.now())
                    .build();

            sale = saleRepository.save(sale);
            System.out.println("✅ Sale seeded successfully!");

            // Create a Transaction linked to the Sale
            Transaction transaction = Transaction.builder()
                    .sale(sale)
                    .transactionDate(LocalDate.now())
                    .amount(BigDecimal.valueOf(500.00))
                    .method(PaymentMethod.CASH)
                    .createdAt(LocalDateTime.now())
                    .build();

            transactionRepository.save(transaction);
            System.out.println("✅ Transaction seeded successfully!");
        } else {
            System.out.println("🔹 Buyers already seeded.");
        }
    }
}
