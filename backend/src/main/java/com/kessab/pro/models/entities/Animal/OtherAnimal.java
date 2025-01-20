package com.kessab.pro.models.entities.Animal;

import com.kessab.pro.models.entities.OtherAnimalType;
import jakarta.persistence.*;

import java.util.List;

@Entity
@DiscriminatorValue("OTHER")
public class OtherAnimal extends Animal {

    @ManyToOne
    @JoinColumn(name = "category_id")
    private OtherAnimalType category;

    @ElementCollection
    private List<String> imagePaths;
}
