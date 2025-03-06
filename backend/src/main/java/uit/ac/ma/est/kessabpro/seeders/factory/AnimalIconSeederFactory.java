package uit.ac.ma.est.kessabpro.seeders.factory;

import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import uit.ac.ma.est.kessabpro.models.entities.Animal;
import uit.ac.ma.est.kessabpro.models.entities.AnimalIcon;
import uit.ac.ma.est.kessabpro.repositories.AnimalIconRepository;

import java.util.ArrayList;
import java.util.List;

public class AnimalIconSeederFactory implements SeederFactory<AnimalIcon> {

    @Override
    public List<AnimalIcon> create(int count) {
        return List.of();
    }

    public List<AnimalIcon> create() {
        String[] iconPaths = {
                "/icons/cow.png",
                "/icons/sheep.png",
                "/icons/live_stock.png",
                "/icons/goat.png"
        };
        List<AnimalIcon> animalIcons = new ArrayList<>();
        for (String iconPath : iconPaths) {
            animalIcons.add(AnimalIcon.builder().iconPath(iconPath).build());
        }

        return animalIcons;
    }
}
