package uit.ac.ma.est.kessabpro.seeders.factory;

import uit.ac.ma.est.kessabpro.models.entities.Animal;
import uit.ac.ma.est.kessabpro.models.entities.AnimalActivitiesLog;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class AnimalActivitiesLogSeederFactory implements SeederFactory<AnimalActivitiesLog> {
    @Override
    public List<AnimalActivitiesLog> create(int count) {
        return List.of();
    }


    private static final String[] ACTIVITIES = {
            "T3liif l-m3iz",
            "R3ayt l-bqar",
            "S9it lbhima",
            "9t3t ch3r lbhima",
            "D7ikt 3la lbhima",
            "S9it l-m3lifa",
            "3tit lbhima l-akl",
            "Tfa9dt si77a dialu"
    };

    private static final Random RANDOM = new Random();

    public List<AnimalActivitiesLog> create(Animal animal, int count) {
        List<AnimalActivitiesLog> logs = new ArrayList<>();

        for (int i = 0; i < count; i++) {
            logs.add(AnimalActivitiesLog.builder()
                    .animal(animal)
                    .logDate(LocalDate.now().minusDays(RANDOM.nextInt(30))) // Random past 30 days
                    .activity(ACTIVITIES[RANDOM.nextInt(ACTIVITIES.length)])
                    .build()
            );
        }

        return logs;
    }
}
