package uit.ac.ma.est.kessabpro.models.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.annotation.Nullable;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;


@Data
public class AnimalDTO {
    private UUID id;
    private String tag;
    private String sex;
    private LocalDate birthDate;
    private BigDecimal price;
    private BigDecimal weight;

    @JsonIgnore
    private List<MultipartFile> images; // Mapping to store uploaded image files
    private List<String> imagePaths; // Mapping to store image paths

    private UUID saleId; // This will store the saleId
    private AnimalCategoryDTO category; // Category object


    // For image existence check, only used for internal processing
    @JsonIgnore
    public boolean isImagesExists() {
        return images != null && !images.isEmpty(); // Check if the images list is not empty
    }

}
