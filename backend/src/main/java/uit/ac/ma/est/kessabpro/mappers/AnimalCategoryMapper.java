package uit.ac.ma.est.kessabpro.mappers;

import org.springframework.stereotype.Component;
import uit.ac.ma.est.kessabpro.models.dto.responses.AnimalCategoryDTOResponse;
import uit.ac.ma.est.kessabpro.models.entities.AnimalCategory;

public class AnimalCategoryMapper {

    public static AnimalCategoryDTOResponse toAnimalCategoryDTO(AnimalCategory animalCategory) {
        return new AnimalCategoryDTOResponse(
                animalCategory.getTypeName(),
                AnimalIconMapper.toAnimalIconDTO(animalCategory.getIcon())
        );
    }
}
