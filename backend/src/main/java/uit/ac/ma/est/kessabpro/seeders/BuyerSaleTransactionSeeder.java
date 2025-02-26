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
import java.util.List;
import java.util.Optional;

@Component
public class BuyerSaleTransactionSeeder {

    private final BuyerRepository buyerRepository;
    private final UserRepository userRepository;
    private final AnimalRepository animalRepository;
    private final SaleRepository saleRepository;
    private final TransactionRepository transactionRepository;

    @PersistenceContext private EntityManager entityManager;

    @Autowired
    BuyerSaleTransactionSeeder(
            BuyerRepository buyerRepository,
            UserRepository userRepository,
            AnimalRepository animalRepository,
            SaleRepository saleRepository,
            TransactionRepository transactionRepository) {

        this.buyerRepository = buyerRepository;
        this.userRepository = userRepository;
        this.animalRepository = animalRepository;
        this.saleRepository = saleRepository;
        this.transactionRepository = transactionRepository;
    }

    @Transactional
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

        User firstUser = entityManager.find(User.class, firstUserOpt.get().getId());
        if (firstUser == null) {
            System.out.println("❌ User not found in the persistence context!");
            return;
        }

        if (buyerRepository.count() == 0) {
            Buyer buyer = Buyer.builder()
                    .user(firstUser)
                    .fullName("John Doe")
                    .CIN("AB123456")
                    .phone("0654321987")
                    .address("789 Buyer Street")
                    .build();

            buyer = buyerRepository.save(buyer);
            System.out.println("✅ Buyer seeded successfully!");

            List<Animal> animalsForSale = animalRepository.findAll().stream().limit(3).toList();
            if (animalsForSale.isEmpty()) {
                System.out.println("❌ No animals found. Please seed animals first!");
                return;
            }

            Sale sale = Sale.builder()
                    .buyer(buyer)
                    .saleDate(LocalDate.now())
                    .agreedAmount(1500.00)
                    .paymentStatus(PaymentStatus.PARTIALLY_PAID)
                    .build();

            sale = saleRepository.save(sale);

            for (Animal animal : animalsForSale) {
                animal.setSale(sale);
                animalRepository.save(animal);
            }

            System.out.println("✅ Sale seeded successfully with " + animalsForSale.size() + " animals.");

            Transaction transaction = Transaction.builder()
                    .sale(sale)
                    .transactionDate(LocalDate.now())
                    .amount(500.00)
                    .method(PaymentMethod.CASH)
                    .build();

            transactionRepository.save(transaction);
            System.out.println("✅ Transaction seeded successfully!");
        } else {
            System.out.println("🔹 Buyers already seeded.");
        }
    }
}
