package uit.ac.ma.est.kessabpro.seeders;

import com.fasterxml.jackson.core.JsonProcessingException;
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
            AnimalIcon cowIcon = AnimalIcon.builder()
                    .iconPath("/icons/cow.png")
                    .build();

            AnimalIcon sheepIcon = AnimalIcon.builder()
                    .iconPath("/icons/sheep.png")
                    .build();

            animalIconRepository.saveAll(Arrays.asList(cowIcon, sheepIcon));

            AnimalCategory cowCategory = AnimalCategory.builder()
                    .typeName("Cow")
                    .icon(cowIcon)
                    .build();

            AnimalCategory sheepCategory = AnimalCategory.builder()
                    .typeName("Sheep")
                    .icon(sheepIcon)
                    .build();

            animalCategoryRepository.saveAll(Arrays.asList(cowCategory, sheepCategory));

            Animal animal1 = Animal.builder()
                    .tag("COW-001")
                    .sex("Female")
                    .birthDate(LocalDate.of(2020, 3, 15))
                    .price(new BigDecimal("1500.00"))
                    .weight(new BigDecimal("500.0"))
                    .category(cowCategory)
                    .pickUpDate(null)
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
            System.out.println("Database already seeded. No new data added.");
        }
    }

}
