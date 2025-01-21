package uit.ac.ma.est.kessabpro.models.entities.Animal;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("GOAT")
public class Goat extends Animal {
    // TODO
}

