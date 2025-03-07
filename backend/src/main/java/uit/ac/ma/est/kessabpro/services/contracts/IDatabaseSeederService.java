package uit.ac.ma.est.kessabpro.services.contracts;

import jakarta.persistence.MappedSuperclass;
import jakarta.transaction.Transactional;

public interface IDatabaseSeederService {
    public void seed();
}
