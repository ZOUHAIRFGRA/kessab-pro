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
        // Step 1: Check if the first user is "admin"
        Optional<User> optionalUser = userRepository.findAll().stream().findFirst();
        if (optionalUser.isEmpty()) {
            System.out.println("No users found. Please seed users first.");
            return;
        }
        User firstUser = optionalUser.get();
        if (!"admin".equalsIgnoreCase(firstUser.getUsername())) {
            System.out.println("First user is not 'admin'. Skipping seeding.");
            return;
        }

        // Step 2: Seed icons if they don’t exist
        long iconCount = animalIconRepository.count();
        if (iconCount >= 4) {
            System.out.println("Icons already seeded (Cow, Sheep, Livestock, Goat). Skipping icon seeding.");
        } else {
            AnimalIcon cowIcon = animalIconRepository.findByIconPath("/icons/cow.png")
                    .orElseGet(() -> animalIconRepository.save(AnimalIcon.builder().iconPath("/icons/cow.png").build()));

            AnimalIcon sheepIcon = animalIconRepository.findByIconPath("/icons/sheep.png")
                    .orElseGet(() -> animalIconRepository.save(AnimalIcon.builder().iconPath("/icons/sheep.png").build()));

            AnimalIcon liveStockIcon = animalIconRepository.findByIconPath("/icons/live_stock.png")
                    .orElseGet(() -> animalIconRepository.save(AnimalIcon.builder().iconPath("/icons/live_stock.png").build()));

            AnimalIcon goatIcon = animalIconRepository.findByIconPath("/icons/goat.png")
                    .orElseGet(() -> animalIconRepository.save(AnimalIcon.builder().iconPath("/icons/goat.png").build()));

            // Step 3: Seed categories for admin if they don’t exist
            if (animalCategoryRepository.count() == 0) {
                AnimalCategory cowCategory = AnimalCategory.builder()
                        .typeName("Cow")
                        .icon(cowIcon)
                        .user(firstUser) // Admin-specific category
                        .build();

                AnimalCategory sheepCategory = AnimalCategory.builder()
                        .typeName("Sheep")
                        .icon(sheepIcon)
                        .user(firstUser) // Admin-specific category
                        .build();

                AnimalCategory livestockCategory = AnimalCategory.builder()
                        .typeName("Livestock")
                        .icon(liveStockIcon)
                        .user(firstUser) // Admin-specific category, not global
                        .build();

                AnimalCategory goatCategory = AnimalCategory.builder()
                        .typeName("Goat")
                        .icon(goatIcon)
                        .user(firstUser) // Admin-specific category
                        .build();

                animalCategoryRepository.saveAll(Arrays.asList(cowCategory, sheepCategory, livestockCategory, goatCategory));
                System.out.println("Categories seeded for admin: Cow, Sheep, Livestock, Goat.");
            } else {
                System.out.println("Categories already exist. Skipping category seeding.");
            }
        }

        // Step 4: Seed animals, logs, etc., only if animals table is empty
        if (animalRepository.count() == 0) {
            // Fetch categories after ensuring they exist for admin
            Optional<AnimalCategory> cowCategoryOpt = animalCategoryRepository.findByUser_IdAndTypeName(firstUser.getId(), "Cow");
            Optional<AnimalCategory> sheepCategoryOpt = animalCategoryRepository.findByUser_IdAndTypeName(firstUser.getId(), "Sheep");

            if (cowCategoryOpt.isEmpty() || sheepCategoryOpt.isEmpty()) {
                System.out.println("Required categories not found for admin. Ensure categories are seeded.");
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
                    .user(firstUser)
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
                    .user(firstUser)
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

            System.out.println("Seeding for admin completed!");
        } else {
            System.out.println("Animals already seeded. No new data added.");
        }
    }
}