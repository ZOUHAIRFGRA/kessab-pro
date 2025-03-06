package uit.ac.ma.est.kessabpro.services.implementations;

import jakarta.transaction.Transactional;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import uit.ac.ma.est.kessabpro.models.entities.*;
import uit.ac.ma.est.kessabpro.repositories.AnimalCategoryRepository;
import uit.ac.ma.est.kessabpro.repositories.AnimalIconRepository;
import uit.ac.ma.est.kessabpro.repositories.BuyerRepository;
import uit.ac.ma.est.kessabpro.repositories.UserRepository;
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

    @Autowired
    public DatabaseSeederService(UserRepository userRepository, BuyerRepository buyerRepository, AnimalCategoryRepository animalCategoryRepository, AnimalIconRepository animalIconRepository) {
        this.userRepository = userRepository;
        this.buyerRepository = buyerRepository;
        this.animalCategoryRepository = animalCategoryRepository;
        this.animalIconRepository = animalIconRepository;
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

            List<User> users = userFactory.create(10);
            List<Buyer> buyers = new ArrayList<>();
            List<AnimalIcon> animalIcons = animalIconSeederFactory.create();
            List<AnimalCategory> animalCategories = animalCategorySeederFactory.create(animalIcons);

            // Save animal icons and categories first
            animalIconRepository.saveAll(animalIcons);
            animalCategoryRepository.saveAll(animalCategories);

            // Create buyers for each user
            for (User user : users) {
                // Add all animal categories to each user (assuming there's a set method or relation to animal categories)
                for (AnimalCategory animalCategory : animalCategories) {
                    animalCategory.set(user); // Assuming an 'addUser' method is available in the AnimalCategory entity
                }

                buyers.addAll(buyerFactory.create(user, buyerCountPerUser));
            }

            // Save the users and buyers
            userRepository.saveAll(users);
            buyerRepository.saveAll(buyers);
        }
    }
}
