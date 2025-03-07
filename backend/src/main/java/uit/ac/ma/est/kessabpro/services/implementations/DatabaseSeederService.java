package uit.ac.ma.est.kessabpro.services.implementations;

import jakarta.transaction.Transactional;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import uit.ac.ma.est.kessabpro.models.entities.*;
import uit.ac.ma.est.kessabpro.repositories.*;
import uit.ac.ma.est.kessabpro.seeders.factory.*;
import uit.ac.ma.est.kessabpro.services.contracts.IDatabaseSeederService;

import java.util.ArrayList;
import java.util.List;

@Service
public class DatabaseSeederService implements IDatabaseSeederService {


    private final UserRepository userRepository;
    private final BuyerRepository buyerRepository;
    private final AnimalCategoryRepository animalCategoryRepository;
    private final AnimalIconRepository animalIconRepository;
    private final SaleRepository saleRepository;
    private final AnimalRepository animalRepository;
    private final AnimalActivitiesLogRepository animalActivitiesLogRepository;
    private final AnimalMedicalLogRepository animalMedicalLogRepository;
    private final TransactionRepository transactionRepository;

    @Autowired
    public DatabaseSeederService(UserRepository userRepository, BuyerRepository buyerRepository, AnimalCategoryRepository animalCategoryRepository, AnimalIconRepository animalIconRepository, SaleRepository saleRepository, AnimalRepository animalRepository, AnimalActivitiesLogRepository animalActivitiesLogRepository, AnimalMedicalLogRepository animalMedicalLogRepository, TransactionRepository transactionRepository) {
        this.userRepository = userRepository;
        this.buyerRepository = buyerRepository;
        this.animalCategoryRepository = animalCategoryRepository;
        this.animalIconRepository = animalIconRepository;
        this.saleRepository = saleRepository;
        this.animalRepository = animalRepository;
        this.animalActivitiesLogRepository = animalActivitiesLogRepository;
        this.animalMedicalLogRepository = animalMedicalLogRepository;
        this.transactionRepository = transactionRepository;
    }

    @Override
    @Transactional
    public void seed() {
        if (userRepository.count() == 0) {
            int userCount = 3;
            int salePerBuyer = 3;
            int transactionPerSale = 2;
            int buyerCountPerUser = 12;
            int animalCountPerUser = 11; //max is 11, add more images for more!
            int medicalLogsCountPerAnimal = 5;
            int activitiesLogsCountPerAnimal = 4;

            UserSeederFactory userFactory = new UserSeederFactory();
            BuyerSeederFactory buyerFactory = new BuyerSeederFactory();
            AnimalIconSeederFactory animalIconSeederFactory = new AnimalIconSeederFactory();
            AnimalCategorySeederFactory animalCategorySeederFactory = new AnimalCategorySeederFactory();
            AnimalSeederFactory animalSeederFactory = new AnimalSeederFactory();
            AnimalMedicalLogSeederFactory animalMedicalLogSeederFactory = new AnimalMedicalLogSeederFactory();
            AnimalActivitiesLogSeederFactory animalActivitiesLogSeederFactory = new AnimalActivitiesLogSeederFactory();
            SaleSeederFactory saleSeederFactory = new SaleSeederFactory(animalRepository);
            TransactionSeederFactory transactionSeederFactory = new TransactionSeederFactory();

            List<User> users = userFactory.create(userCount);
            List<Buyer> buyers = new ArrayList<>();
            List<AnimalIcon> animalIcons = animalIconSeederFactory.create();


            List<User> usersEntities = userRepository.saveAll(users);

            animalIconRepository.saveAll(animalIcons);

            try {
                for (User user : usersEntities) {
                    List<AnimalCategory> animalCategories = animalCategorySeederFactory.create(animalIcons);
                    for (AnimalCategory animalCategory : animalCategories) {
                        animalCategory.setUser(user);
                        AnimalCategory savedCategory =  animalCategoryRepository.save(animalCategory);
                        List<Animal> animals = animalSeederFactory.create(savedCategory, user, animalCountPerUser);
                       for (Animal animal : animals) {
                           List<AnimalMedicalLog> animalMedicalLogs = animalMedicalLogSeederFactory.create(animal,medicalLogsCountPerAnimal);
                           List<AnimalActivitiesLog> animalActivitiesLogs = animalActivitiesLogSeederFactory.create(animal,activitiesLogsCountPerAnimal);
                           animalActivitiesLogRepository.saveAll(animalActivitiesLogs);
                           animalMedicalLogRepository.saveAll(animalMedicalLogs);
                       }
                        animalRepository.saveAll(animals);
                    }
                    buyers.addAll(buyerFactory.create(user, buyerCountPerUser));
                    for (Buyer buyer : buyers) {
                        buyerRepository.save(buyer);
                        List<Sale> sales = saleSeederFactory.createSales(buyer,user,salePerBuyer);
                        saleRepository.saveAll(sales);
                        for (Sale sale : sales) {
                            List<Transaction> transactions = transactionSeederFactory.create(sale,transactionPerSale,user);
                            transactionRepository.saveAll(transactions);
                        }
                    }
                }

            } catch (Exception e) {
                throw new RuntimeException(e.getMessage(), e);
            }


            userRepository.saveAll(usersEntities);
        }
    }
}
