package uit.ac.ma.est.kessabpro.seeders.factory;

import uit.ac.ma.est.kessabpro.models.entities.AnimalCategory;
import uit.ac.ma.est.kessabpro.models.entities.AnimalIcon;

import java.util.List;
import java.util.Map;

public class AnimalCategorySeederFactory implements SeederFactory<AnimalCategory>{
    @Override
    public List<AnimalCategory> create(int count) {
        return List.of();
    }

    public List<AnimalCategory> create(List<AnimalIcon> icons) {
        AnimalCategory cowCategory = AnimalCategory.builder()
                .typeName("Cow")
                .icon(icons.getFirst())
                .build();

        AnimalCategory sheepCategory = AnimalCategory.builder()
                .typeName("Sheep")
                .icon(icons.get(1))
                .build();

        AnimalCategory defaultCategory = AnimalCategory.builder()
                .typeName("Livestock")
                .icon(icons.get(2))
                .build();

        AnimalCategory goatCategory = AnimalCategory.builder()
                .typeName("Goat")
                .icon(icons.get(3))
                .build();

        return List.of(cowCategory, sheepCategory, defaultCategory, goatCategory);
    }
}
