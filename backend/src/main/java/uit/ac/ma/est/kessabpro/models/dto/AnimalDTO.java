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
    private List<MultipartFile> images;
    private List<String> imagePaths;

    private UUID saleId;
    private AnimalCategoryDTO category;


    // For image existence check, only used for internal processing
    @JsonIgnore
    public boolean isImagesExists() {
        return images != null && !images.isEmpty();
    }

}
