package uit.ac.ma.est.kessabpro.models.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class AnimalCategoryDTO {
    private UUID id;
    private String typeName;
    private AnimalIconDTO icon;
}
