package uit.ac.ma.est.kessabpro.mappers;

import org.springframework.stereotype.Component;
import uit.ac.ma.est.kessabpro.models.dto.responses.AnimalIconDTOResponse;
import uit.ac.ma.est.kessabpro.models.entities.AnimalIcon;

@Component
public class AnimalIconMapper {

    public static AnimalIconDTOResponse toAnimalIconDTO(AnimalIcon animalIcon) {
        return new AnimalIconDTOResponse(
                animalIcon.getIconPath()
        );
    }
}
