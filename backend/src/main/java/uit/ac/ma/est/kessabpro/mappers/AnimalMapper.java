package uit.ac.ma.est.kessabpro.mappers;

import com.fasterxml.jackson.core.JsonProcessingException;
import uit.ac.ma.est.kessabpro.models.dto.AnimalCategoryDTO;
import uit.ac.ma.est.kessabpro.models.dto.AnimalDTO;
import uit.ac.ma.est.kessabpro.models.dto.AnimalIconDTO;
import uit.ac.ma.est.kessabpro.models.dto.SaleDTO;
import uit.ac.ma.est.kessabpro.models.entities.Animal;
import uit.ac.ma.est.kessabpro.models.entities.AnimalCategory;
import uit.ac.ma.est.kessabpro.models.entities.AnimalIcon;
import uit.ac.ma.est.kessabpro.models.entities.Sale;


public class AnimalMapper {

    public static AnimalDTO toDTO(Animal animal) {
        AnimalDTO dto = new AnimalDTO();
        dto.setId(animal.getId());
        dto.setTag(animal.getTag());
        dto.setSex(animal.getSex());
        dto.setBirthDate(animal.getBirthDate());
        dto.setPrice(animal.getPrice());
        dto.setWeight(animal.getWeight());

        // Map image paths
        dto.setImagePaths(animal.getImagePaths());

        // Map saleId
        dto.setSaleId(animal.getSale() != null ? animal.getSale().getId() : null);

        // Map category
        if (animal.getCategory() != null) {
            AnimalCategoryDTO categoryDTO = new AnimalCategoryDTO();
            categoryDTO.setId(animal.getCategory().getId());
            categoryDTO.setTypeName(animal.getCategory().getTypeName());

            if (animal.getCategory().getIcon() != null) {
                AnimalIconDTO iconDTO = new AnimalIconDTO();
                iconDTO.setId(animal.getCategory().getIcon().getId());
                iconDTO.setIconPath(animal.getCategory().getIcon().getIconPath());
                categoryDTO.setIcon(iconDTO);
            }

            dto.setCategory(categoryDTO);
        }

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

        // Map image paths
        animal.setImagePaths(dto.getImagePaths());

        // Map sale (only if saleId exists)
        if (dto.getSaleId() != null) {
            Sale sale = new Sale();
            sale.setId(dto.getSaleId());
            animal.setSale(sale);
        }

        // Map category
        if (dto.getCategory() != null) {
            AnimalCategory category = new AnimalCategory();
            category.setId(dto.getCategory().getId());
            category.setTypeName(dto.getCategory().getTypeName());

            if (dto.getCategory().getIcon() != null) {
                AnimalIcon icon = new AnimalIcon();
                icon.setId(dto.getCategory().getIcon().getId());
                icon.setIconPath(dto.getCategory().getIcon().getIconPath());
                category.setIcon(icon);
            }

            animal.setCategory(category);
        }

        return animal;
    }
}
