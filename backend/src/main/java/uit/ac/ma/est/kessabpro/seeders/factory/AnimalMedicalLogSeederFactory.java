package uit.ac.ma.est.kessabpro.seeders.factory;

import uit.ac.ma.est.kessabpro.models.entities.Animal;
import uit.ac.ma.est.kessabpro.models.entities.AnimalMedicalLog;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class AnimalMedicalLogSeederFactory implements SeederFactory<AnimalMedicalLog> {
    @Override
    public List<AnimalMedicalLog> create(int count) {
        return List.of();
    }

    private static final String[] MOROCCAN_VET_NAMES = {
            "Dr. Amine", "Dr. Youssef", "Dr. Fatima", "Dr. Rachid", "Dr. Karim",
            "Dr. Amina", "Dr. Samir", "Dr. Mehdi", "Dr. Hanan", "Dr. Soufiane"
    };

    private static final String[] DESCRIPTIONS = {
            "tebib dar visit",
            "tal9i7",
            "3ilaj jarh sghir",
            "T9ti7 ddwa dial d-didan",
            "Nasi7a f tghdiya",
            "T9ti3 l-2afaf",
            "9tal l-parazit",
            "T9yiim 3am dial si77a"
    };

    private static final Random RANDOM = new Random();

    public List<AnimalMedicalLog> create(Animal animal, int count) {
        List<AnimalMedicalLog> logs = new ArrayList<>();

        for (int i = 0; i < count; i++) {
            logs.add(AnimalMedicalLog.builder()
                    .animal(animal)
                    .logDate(LocalDate.now().minusDays(RANDOM.nextInt(365)))
                    .description(DESCRIPTIONS[RANDOM.nextInt(DESCRIPTIONS.length)])
                    .vetName(MOROCCAN_VET_NAMES[RANDOM.nextInt(MOROCCAN_VET_NAMES.length)])
                    .build());
        }

        return logs;
    }
}
