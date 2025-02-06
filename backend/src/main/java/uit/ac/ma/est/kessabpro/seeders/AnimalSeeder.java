package uit.ac.ma.est.kessabpro.seeders;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import uit.ac.ma.est.kessabpro.models.entities.*;
import uit.ac.ma.est.kessabpro.repositories.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.UUID;

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


    public void seedData() {
        if (animalRepository.count() == 0) {
            // Create AnimalIcon
            AnimalIcon cowIcon = AnimalIcon.builder()
                    .iconPath("/icons/cow.png")
                    .build();

            AnimalIcon sheepIcon = AnimalIcon.builder()
                    .iconPath("/icons/sheep.png")
                    .build();

            animalIconRepository.saveAll(Arrays.asList(cowIcon, sheepIcon));

            // Create AnimalCategory
            AnimalCategory cowCategory = AnimalCategory.builder()
                    .typeName("Cow")
                    .icon(cowIcon)
                    .build();

            AnimalCategory sheepCategory = AnimalCategory.builder()
                    .typeName("Sheep")
                    .icon(sheepIcon)
                    .build();

            animalCategoryRepository.saveAll(Arrays.asList(cowCategory, sheepCategory));

            // Create Animals
            Animal animal1 = Animal.builder()
                    .tag("COW-001")
                    .sex("Female")
                    .birthDate(LocalDate.of(2020, 3, 15))
                    .price(new BigDecimal("1500.00"))
                    .weight(new BigDecimal("500.0"))
                    .category(cowCategory)
//                    .imagePaths("/images/cow1.png")
                    .pickUpDate(null)

                    .build();

            Animal animal2 = Animal.builder()
                    .tag("SHEEP-001")
                    .sex("Male")
                    .birthDate(LocalDate.of(2021, 5, 20))
                    .price(new BigDecimal("800.00"))
                    .weight(new BigDecimal("60.0"))
                    .category(sheepCategory)
//                    .imagePaths("/images/sheep1.png")
                    .pickUpDate(LocalDate.of(2025, 2, 15))

                    .build();
            Animal animal3 = Animal.builder()
                    .tag("SHEEP-001")
                    .sex("Male")
                    .birthDate(LocalDate.of(2021, 5, 20))
                    .price(new BigDecimal("800.00"))
                    .weight(new BigDecimal("60.0"))
                    .category(sheepCategory)
//                    .imagePaths("/images/sheep1.png")
                    .pickUpDate(LocalDate.of(2025, 2, 15))

                    .build();
            Animal animal4 = Animal.builder()
                    .tag("SHEEP-001")
                    .sex("Male")
                    .birthDate(LocalDate.of(2021, 5, 20))
                    .price(new BigDecimal("800.00"))
                    .weight(new BigDecimal("60.0"))
                    .category(sheepCategory)
//                    .imagePaths("/images/sheep1.png")
                    .pickUpDate(LocalDate.of(2025, 2, 15))

                    .build();

            animalRepository.saveAll(Arrays.asList(animal1, animal2,animal3,animal4));

            // Create AnimalActivitiesLog
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

            // Create AnimalMedicalLog
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
            System.out.println("Database already seeded. No new data added.");
        }
    }
}
