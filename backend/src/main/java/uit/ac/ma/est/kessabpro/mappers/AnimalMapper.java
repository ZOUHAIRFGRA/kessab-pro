package uit.ac.ma.est.kessabpro.mappers;

import com.fasterxml.jackson.core.JsonProcessingException;
import uit.ac.ma.est.kessabpro.models.dto.AnimalDTO;
import uit.ac.ma.est.kessabpro.models.entities.Animal;
import uit.ac.ma.est.kessabpro.models.entities.AnimalCategory;
import uit.ac.ma.est.kessabpro.models.entities.Sale;

import java.util.UUID;

public class AnimalMapper {

    public static AnimalDTO toDTO(Animal animal) {
        AnimalDTO dto = new AnimalDTO();
        dto.setId(animal.getId());
        dto.setTag(animal.getTag());
        dto.setSex(animal.getSex());
        dto.setBirthDate(animal.getBirthDate());
        dto.setPrice(animal.getPrice());
        dto.setWeight(animal.getWeight());

        dto.setImagePaths(animal.getImagePaths());
        dto.setSaleId(animal.getSale() != null ? animal.getSale().getId() : null);

        dto.setCategory(animal.getCategory() != null ? animal.getCategory().getId().toString() : null);

        return dto;
    }

    public static Animal toEntity(AnimalDTO dto) throws JsonProcessingException {
        Animal animal = new Animal();
        animal.setId(dto.getId());
        animal.setTag(dto.getTag());
        animal.setSex(dto.getSex());
        animal.setBirthDate(dto.getBirthDate());
        animal.setPrice(dto.getPrice());
        animal.setWeight(dto.getWeight());

        animal.setImagePaths(dto.getImagePaths());

        if (dto.getSaleId() != null) {
            Sale sale = new Sale();
            sale.setId(dto.getSaleId());
            animal.setSale(sale);
        }

        if (dto.getCategory() != null) {
            try {
                UUID categoryId = UUID.fromString(dto.getCategory());
                AnimalCategory category = new AnimalCategory();
                category.setId(categoryId);
                animal.setCategory(category);
            } catch (IllegalArgumentException e) {
                throw new RuntimeException("❌ Invalid category ID format!");
            }
        }

        return animal;
    }
}
