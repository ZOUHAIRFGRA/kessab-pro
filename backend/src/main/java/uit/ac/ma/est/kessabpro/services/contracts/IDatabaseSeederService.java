package uit.ac.ma.est.kessabpro.services.contracts;

import jakarta.persistence.MappedSuperclass;
import jakarta.transaction.Transactional;

@MappedSuperclass
public interface IDatabaseSeederService {
    @Transactional
    public void seed();
}
