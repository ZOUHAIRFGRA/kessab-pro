package uit.ac.ma.est.kessabpro.services.implementations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public class GenericRepositoryService {

    private final ApplicationContext applicationContext;

    @Autowired
    public GenericRepositoryService(ApplicationContext applicationContext) {
        this.applicationContext = applicationContext;
    }

    public <T, ID> JpaRepository<T, ID> getRepository(Class<T> entityClass) {
        String repositoryBeanName = entityClass.getSimpleName() + "Repository";
        return (JpaRepository<T, ID>) applicationContext.getBean(repositoryBeanName);
    }
}