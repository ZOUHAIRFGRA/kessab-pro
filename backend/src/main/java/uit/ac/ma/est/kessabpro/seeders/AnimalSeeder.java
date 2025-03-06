package uit.ac.ma.est.kessabpro.seeders;

import com.fasterxml.jackson.core.JsonProcessingException;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import uit.ac.ma.est.kessabpro.models.entities.*;
import uit.ac.ma.est.kessabpro.repositories.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.Optional;

@Component
public class AnimalSeeder {

    @Autowired
    private AnimalRepository animalRepository;

    @Autowired
    private AnimalCategoryRepository animalCategoryRepository;

    @Autowired
    private AnimalIconRepository animalIconRepository;

    @Autowired
    private AnimalActivitiesLogRepository animalActivitiesLogRepository;

    @Autowired
    private AnimalMedicalLogRepository animalMedicalLogRepository;

    @Autowired
    private UserRepository userRepository;

//    @PostConstruct
//    public void init() {
//        seedData();
//    }

    public void seedData() {
        // Step 1: Check if icons already exist
        long iconCount = animalIconRepository.count();
        if (iconCount >= 4) {
            System.out.println("Icons already seeded (Cow, Sheep, Livestock, Goat). Skipping icon and category seeding.");
        } else {
            // Step 2: Seed icons if they don't exist
            AnimalIcon cowIcon = animalIconRepository.findByIconPath("/icons/cow.png")
                    .orElseGet(() -> animalIconRepository.save(AnimalIcon.builder().iconPath("/icons/cow.png").build()));

            AnimalIcon sheepIcon = animalIconRepository.findByIconPath("/icons/sheep.png")
                    .orElseGet(() -> animalIconRepository.save(AnimalIcon.builder().iconPath("/icons/sheep.png").build()));

            AnimalIcon liveStockIcon = animalIconRepository.findByIconPath("/icons/live_stock.png")
                    .orElseGet(() -> animalIconRepository.save(AnimalIcon.builder().iconPath("/icons/live_stock.png").build()));

            AnimalIcon goatIcon = animalIconRepository.findByIconPath("/icons/goat.png")
                    .orElseGet(() -> animalIconRepository.save(AnimalIcon.builder().iconPath("/icons/goat.png").build()));

            // Step 3: Seed categories if they don't exist
            if (animalCategoryRepository.count() == 0) {
                AnimalCategory cowCategory = AnimalCategory.builder()
                        .typeName("Cow")
                        .icon(cowIcon)
                        .build();

                AnimalCategory sheepCategory = AnimalCategory.builder()
                        .typeName("Sheep")
                        .icon(sheepIcon)
                        .build();

                AnimalCategory defaultCategory = AnimalCategory.builder()
                        .typeName("Livestock")
                        .icon(liveStockIcon)
                        .build();

                AnimalCategory goatCategory = AnimalCategory.builder()
                        .typeName("Goat")
                        .icon(goatIcon)
                        .build();

                animalCategoryRepository.saveAll(Arrays.asList(cowCategory, sheepCategory, defaultCategory, goatCategory));
                System.out.println("Categories seeded: Cow, Sheep, Livestock, Goat.");
            } else {
                System.out.println("Categories already exist. Skipping category seeding.");
            }
        }

        // Step 4: Seed animals, logs, etc., only if animals table is empty
        if (animalRepository.count() == 0) {
            Optional<User> optionalUser = userRepository.findAll().stream().findFirst();
            if (optionalUser.isEmpty()) {
                System.out.println("No users found. Please seed users first.");
                return;
            }
            User user = optionalUser.get();

            // Fetch categories after ensuring they exist
            Optional<AnimalCategory> cowCategoryOpt = animalCategoryRepository.findByTypeName("Cow");
            Optional<AnimalCategory> sheepCategoryOpt = animalCategoryRepository.findByTypeName("Sheep");

            if (cowCategoryOpt.isEmpty() || sheepCategoryOpt.isEmpty()) {
                System.out.println("Required categories not found. Ensure categories are seeded.");
                return;
            }

            AnimalCategory cowCategory = cowCategoryOpt.get();
            AnimalCategory sheepCategory = sheepCategoryOpt.get();

            Animal animal1 = Animal.builder()
                    .tag("COW-001")
                    .sex("Female")
                    .birthDate(LocalDate.of(2020, 3, 15))
                    .price(new BigDecimal("1500.00"))
                    .weight(new BigDecimal("500.0"))
                    .category(cowCategory)
                    .pickUpDate(null)
                    .user(user)
                    .build();

            try {
                animal1.addImagePath("/images/cow1.png");
                animal1.addImagePath("/images/cow2.png");
            } catch (JsonProcessingException e) {
                e.printStackTrace();
            }

            Animal animal2 = Animal.builder()
                    .tag("SHEEP-001")
                    .sex("Male")
                    .birthDate(LocalDate.of(2021, 5, 20))
                    .price(new BigDecimal("800.00"))
                    .weight(new BigDecimal("60.0"))
                    .category(sheepCategory)
                    .pickUpDate(LocalDate.of(2025, 2, 15))
                    .user(user)
                    .build();

            try {
                animal2.addImagePath("/images/sheep1.png");
                animal2.addImagePath("/images/sheep1.png");
            } catch (JsonProcessingException e) {
                e.printStackTrace();
            }

            animalRepository.saveAll(Arrays.asList(animal1, animal2));

            AnimalActivitiesLog log1 = AnimalActivitiesLog.builder()
                    .animal(animal1)
                    .logDate(LocalDate.now().minusDays(10))
                    .activity("Feeding")
                    .build();

            AnimalActivitiesLog log2 = AnimalActivitiesLog.builder()
                    .animal(animal2)
                    .logDate(LocalDate.now().minusDays(5))
                    .activity("Shearing")
                    .build();

            animalActivitiesLogRepository.saveAll(Arrays.asList(log1, log2));

            AnimalMedicalLog medicalLog1 = AnimalMedicalLog.builder()
                    .animal(animal1)
                    .logDate(LocalDate.now().minusMonths(1))
                    .description("Routine check-up, vaccinated for FMD.")
                    .vetName("Dr. Smith")
                    .build();

            AnimalMedicalLog medicalLog2 = AnimalMedicalLog.builder()
                    .animal(animal2)
                    .logDate(LocalDate.now().minusMonths(2))
                    .description("Treated for parasitic infection.")
                    .vetName("Dr. Jones")
                    .build();

            animalMedicalLogRepository.saveAll(Arrays.asList(medicalLog1, medicalLog2));

            System.out.println("Seeding for animal completed!");
        } else {
            System.out.println("Animals already seeded. No new data added.");
        }
    }
}