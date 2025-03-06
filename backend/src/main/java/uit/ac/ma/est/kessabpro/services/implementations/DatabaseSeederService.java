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

    @Autowired
    public DatabaseSeederService(UserRepository userRepository, BuyerRepository buyerRepository, AnimalCategoryRepository animalCategoryRepository, AnimalIconRepository animalIconRepository, SaleRepository saleRepository, AnimalRepository animalRepository) {
        this.userRepository = userRepository;
        this.buyerRepository = buyerRepository;
        this.animalCategoryRepository = animalCategoryRepository;
        this.animalIconRepository = animalIconRepository;
        this.saleRepository = saleRepository;
        this.animalRepository = animalRepository;
    }

    @Override
    @Transactional
    public void seed() {
        if (userRepository.count() == 0) {
            int buyerCountPerUser = 25; // Number of buyers per user

            UserSeederFactory userFactory = new UserSeederFactory();
            BuyerSeederFactory buyerFactory = new BuyerSeederFactory();
            AnimalIconSeederFactory animalIconSeederFactory = new AnimalIconSeederFactory();
            AnimalCategorySeederFactory animalCategorySeederFactory = new AnimalCategorySeederFactory();
            AnimalSeederFactory animalSeederFactory = new AnimalSeederFactory();

            List<User> users = userFactory.create(10);
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
                        List<Animal> animals = animalSeederFactory.create(savedCategory, user, 11);
                        //for each animal create 7 medical logs
                        //for each animal create 7 activites logs
                        animalRepository.saveAll(animals);
                    }
                    buyers.addAll(buyerFactory.create(user, buyerCountPerUser));
                }

            } catch (Exception e) {
                throw new RuntimeException("error while seeding database", e);
            }


            userRepository.saveAll(usersEntities);
            buyerRepository.saveAll(buyers);
        }
    }
}
