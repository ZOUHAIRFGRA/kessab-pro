package uit.ac.ma.est.kessabpro.mappers;
import com.fasterxml.jackson.core.JsonProcessingException;
import uit.ac.ma.est.kessabpro.models.dto.AnimalDTO;
import uit.ac.ma.est.kessabpro.models.entities.Animal;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class AnimalMapper {

    public static AnimalDTO toDTO(Animal animal) {
        AnimalDTO dto = new AnimalDTO();
        dto.setTag(animal.getTag());
        dto.setSex(animal.getSex());
        dto.setBirthDate(animal.getBirthDate());
        dto.setPrice(animal.getPrice());
        dto.setWeight(animal.getWeight());
        return dto;
    }

    public static Animal toEntity(AnimalDTO animalDTO) {
        Animal animal = Animal.builder()
                .id(null)
                .tag(animalDTO.getTag())
                .sex(animalDTO.getSex())
                .birthDate(animalDTO.getBirthDate())
                .price(animalDTO.getPrice())
                .weight(animalDTO.getWeight())
                .build();
        try {
            animal.setImagePaths(new ArrayList<>());
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error setting image paths", e);
        }

        return animal;
    }
}

