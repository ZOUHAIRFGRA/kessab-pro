package uit.ac.ma.est.kessabpro.seeders.factory;

import com.fasterxml.jackson.core.JsonProcessingException;
import uit.ac.ma.est.kessabpro.helpers.ImageLoader;
import uit.ac.ma.est.kessabpro.models.entities.Animal;
import uit.ac.ma.est.kessabpro.models.entities.AnimalCategory;
import uit.ac.ma.est.kessabpro.models.entities.User;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.*;

public class AnimalSeederFactory implements SeederFactory<Animal> {

    @Override
    public List<Animal> create(int count) {
        return List.of();
    }

    public List<Animal> create(AnimalCategory category, User user, int count) throws JsonProcessingException {
        List<Animal> animals = new ArrayList<>();

        Random rnd = new Random();

        for (int i = 0; i < count; i++) {

            Animal newAnimal = Animal.builder()
                    .tag(String.valueOf(10000000 + rnd.nextInt(90000000)))
                    .sex(rnd.nextBoolean() ? "Male" : "Female")
                    .birthDate(LocalDate.now().minusDays(rnd.nextInt(1000)))
                    .price(BigDecimal.valueOf(1000 + rnd.nextInt(5000)))
                    .weight(BigDecimal.valueOf(50 + rnd.nextInt(300)))
                    .pickUpDate(null)
                    .category(category)
                    .sale(null)
                    .user(user)
                    .build();

            newAnimal.addImagePath(getImageByCat(i, category));
            animals.add(newAnimal);
        }


        return animals;
    }

    private String getImageByCat(int index, AnimalCategory category) {
        String categoryName = category.getTypeName().toLowerCase();
        if (categoryName.equals("livestock")) {
            return "/images/live_stock.png";
        }
        List<String> images = ImageLoader.getImagesByCategory(categoryName);
        if (images.isEmpty()) {
            return "/images/live_stock.png";
        }
        return images.get(index);
    }
}
