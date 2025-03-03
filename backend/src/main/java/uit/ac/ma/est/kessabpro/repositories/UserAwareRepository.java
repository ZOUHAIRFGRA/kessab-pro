package uit.ac.ma.est.kessabpro.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.NoRepositoryBean;
import uit.ac.ma.est.kessabpro.auditing.UserAware;

@NoRepositoryBean
public interface UserAwareRepository<T extends UserAware, ID> extends JpaRepository<T, ID>, JpaSpecificationExecutor<T> {
}
