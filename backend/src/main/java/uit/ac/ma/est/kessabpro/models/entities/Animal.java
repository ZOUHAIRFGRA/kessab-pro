package uit.ac.ma.est.kessabpro.models.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
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
    private AnimalCategory category;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sale_id", referencedColumnName = "id")
    @JsonIgnoreProperties({"animals"})
    @JsonBackReference
    private Sale sale;

    @Column(columnDefinition = "json default '[]'")
    @Nullable
    private String imagePaths;

    @OneToMany(mappedBy = "animal", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<AnimalActivitiesLog> activityLogs = new ArrayList<>();

    @OneToMany(mappedBy = "animal", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<AnimalMedicalLog> medicalLogs = new ArrayList<>();

    public List<String> getImagePaths() {
        try {
            if (imagePaths == null || imagePaths.isEmpty()) {
                return new ArrayList<>();
            }
            return new ObjectMapper().readValue(imagePaths, List.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return new ArrayList<>();
        }
    }

    public void setImagePaths(List<String> paths) throws JsonProcessingException {
        if (paths == null || paths.isEmpty()) {
            this.imagePaths = "[]";
        } else {
            this.imagePaths = new ObjectMapper().writeValueAsString(paths);
        }
    }

    public void addImagePath(String path) throws JsonProcessingException {
        List<String> paths = getImagePaths();
        paths.add(path);
        setImagePaths(paths);
    }

    public UUID getSaleId() {
        if (sale != null) {
            return sale.getId();
        }
        return null;
    }

    @Nullable
    private LocalDate pickUpDate;
}