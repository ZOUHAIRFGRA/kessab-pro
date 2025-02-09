package uit.ac.ma.est.kessabpro.models.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Animal extends BaseEntity {

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
    @Nullable
    private AnimalCategory category;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sale_id", referencedColumnName = "id")
    @JsonIgnoreProperties({"animals"})  // Prevent circular references
    @JsonBackReference  // Prevent full serialization of the Sale object
    private Sale sale;

    @Column(columnDefinition = "json default '[]'")
    @Nullable
    private String imagePaths;

    public List<String> getImagePaths() {
        try {
            if (imagePaths == null || imagePaths.isEmpty()) {
                return new ArrayList<>();  // Return empty list if no data
            }
            return new ObjectMapper().readValue(imagePaths, List.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return new ArrayList<>();  // Return empty list on error
        }
    }

    public void setImagePaths(List<String> paths) throws JsonProcessingException {
        if (paths == null || paths.isEmpty()) {
            this.imagePaths = "[]";  // Store empty array as JSON string
        } else {
            this.imagePaths = new ObjectMapper().writeValueAsString(paths);
        }
    }

    public void addImagePath(String path) throws JsonProcessingException {
        List<String> paths = getImagePaths();  // Get the current list of image paths
        paths.add(path);  // Add the new image path
        setImagePaths(paths);  // Update the imagePaths field with the new list
    }

    public UUID getSaleId() {
        if (sale != null) {
            return sale.getId();  // Only return sale ID if it's not null
        }
        return null;
    }

    @Nullable
    private LocalDate pickUpDate;
}
