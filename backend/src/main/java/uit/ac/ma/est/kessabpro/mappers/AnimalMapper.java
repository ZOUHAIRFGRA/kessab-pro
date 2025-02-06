package uit.ac.ma.est.kessabpro.mappers;
import uit.ac.ma.est.kessabpro.models.dto.AnimalDTO;
import uit.ac.ma.est.kessabpro.models.entities.Animal;

import java.util.List;

public class AnimalMapper {

    public static AnimalDTO toDTO(Animal entity) {
        AnimalDTO dto = new AnimalDTO();
        dto.setTag(entity.getTag());
        dto.setSex(entity.getSex());
        dto.setBirthDate(entity.getBirthDate());
        dto.setPrice(entity.getPrice());
        dto.setWeight(entity.getWeight());
        return dto;
    }
}

