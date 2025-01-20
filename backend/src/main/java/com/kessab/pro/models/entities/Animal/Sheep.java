package com.kessab.pro.models.entities.Animal;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("SHEEP")
public class Sheep extends Animal {
    // TODO
}
