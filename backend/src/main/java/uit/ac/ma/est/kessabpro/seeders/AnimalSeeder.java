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

    @PostConstruct
    public void seedData() {
        if (animalRepository.count() == 0) {
            // Create AnimalIcon
            AnimalIcon cowIcon = AnimalIcon.builder()
                    .iconPath("/icons/cow.png")
                    .createdAt(LocalDateTime.now())
                    .build();

            AnimalIcon sheepIcon = AnimalIcon.builder()
                    .iconPath("/icons/sheep.png")
                    .createdAt(LocalDateTime.now())
                    .build();

            animalIconRepository.saveAll(Arrays.asList(cowIcon, sheepIcon));

            // Create AnimalCategory
            AnimalCategory cowCategory = AnimalCategory.builder()
                    .typeName("Cow")
                    .icon(cowIcon)
                    .createdAt(LocalDateTime.now())
                    .build();

            AnimalCategory sheepCategory = AnimalCategory.builder()
                    .typeName("Sheep")
                    .icon(sheepIcon)
                    .createdAt(LocalDateTime.now())
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
                    .imagePaths("/images/cow1.png")
                    .pickUpDate(null)
                    .createdAt(LocalDateTime.now())
                    .updatedAt(LocalDateTime.now())
                    .build();

            Animal animal2 = Animal.builder()
                    .tag("SHEEP-001")
                    .sex("Male")
                    .birthDate(LocalDate.of(2021, 5, 20))
                    .price(new BigDecimal("800.00"))
                    .weight(new BigDecimal("60.0"))
                    .category(sheepCategory)
                    .imagePaths("/images/sheep1.png")
                    .pickUpDate(LocalDate.of(2025, 2, 15))
                    .createdAt(LocalDateTime.now())
                    .updatedAt(LocalDateTime.now())
                    .build();

            animalRepository.saveAll(Arrays.asList(animal1, animal2));

            // Create AnimalActivitiesLog
            AnimalActivitiesLog log1 = AnimalActivitiesLog.builder()
                    .animal(animal1)
                    .logDate(LocalDate.now().minusDays(10))
                    .activity("Feeding")
                    .createdAt(LocalDateTime.now().minusDays(10))
                    .build();

            AnimalActivitiesLog log2 = AnimalActivitiesLog.builder()
                    .animal(animal2)
                    .logDate(LocalDate.now().minusDays(5))
                    .activity("Shearing")
                    .createdAt(LocalDateTime.now().minusDays(5))
                    .build();

            animalActivitiesLogRepository.saveAll(Arrays.asList(log1, log2));

            // Create AnimalMedicalLog
            AnimalMedicalLog medicalLog1 = AnimalMedicalLog.builder()
                    .animal(animal1)
                    .logDate(LocalDate.now().minusMonths(1))
                    .description("Routine check-up, vaccinated for FMD.")
                    .vetName("Dr. Smith")
                    .createdAt(LocalDateTime.now().minusMonths(1))
                    .build();

            AnimalMedicalLog medicalLog2 = AnimalMedicalLog.builder()
                    .animal(animal2)
                    .logDate(LocalDate.now().minusMonths(2))
                    .description("Treated for parasitic infection.")
                    .vetName("Dr. Jones")
                    .createdAt(LocalDateTime.now().minusMonths(2))
                    .build();

            animalMedicalLogRepository.saveAll(Arrays.asList(medicalLog1, medicalLog2));

            System.out.println("Seeding completed!");
        } else {
            System.out.println("Database already seeded. No new data added.");
        }
    }
}
