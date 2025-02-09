package uit.ac.ma.est.kessabpro.models.dto;

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
    private List<MultipartFile> images;
    private UUID saleId;

    public boolean isImagesExists() {
        return images != null && !images.isEmpty();
    }
}
