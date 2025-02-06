package uit.ac.ma.est.kessabpro.models.entities;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public  class Animal extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;
    private String tag;
    private String sex;
    private LocalDate birthDate;
    private BigDecimal price;
    private BigDecimal weight;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private AnimalCategory category;

    @Column(columnDefinition = "json default '[]'")
    private String imagePaths;

    public List<String> getImagePaths()   {
        try {
            return (List<String>) new ObjectMapper().readValue(imagePaths, List.class);
        }catch (JsonProcessingException e){
            return List.of();
        }
    }

    public void setImagePaths(List<String> paths) throws JsonProcessingException {
        this.imagePaths = new ObjectMapper().writeValueAsString(paths);
    }

     public void addImagePath(String path) throws JsonProcessingException {
        List<String> paths = getImagePaths();
        paths.add(path);
        setImagePaths(paths);
    }

    @Nullable
    private LocalDate pickUpDate;


}
