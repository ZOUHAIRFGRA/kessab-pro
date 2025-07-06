package uit.ac.ma.est.kessabpro.aspect;

import jakarta.persistence.EntityManager;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.*;
import org.hibernate.Filter;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import uit.ac.ma.est.kessabpro.auditing.UserAware;
import uit.ac.ma.est.kessabpro.repositories.UserAwareRepository;
import uit.ac.ma.est.kessabpro.repositories.UserRepository;
import uit.ac.ma.est.kessabpro.services.contracts.IAuthService;

import java.nio.file.AccessDeniedException;
import java.util.UUID;

@Aspect
@Component
public class UserAwareAspect {

    IAuthService authService;
    UserRepository userRepository;
    private EntityManager entityManager;


    @Autowired
    public void UserAware(IAuthService authService, UserRepository userRepository,EntityManager entityManager) {
        this.authService = authService;
        this.userRepository = userRepository;
        this.entityManager = entityManager;
    }

    @Before("execution(* org.springframework.data.repository.CrudRepository+.save(..))")
    public void setCreatedBy(JoinPoint joinPoint) throws AccessDeniedException {
        Object entity = joinPoint.getArgs()[0];
        if (entity instanceof UserAware && ((UserAware) entity).getUser() == null) {
            ((UserAware) entity).setUser(authService.getLoggedUser());
        }
    }

    @Before("execution(* org.springframework.data.jpa.repository.JpaSpecificationExecutor+.find*(..))")
    public void enableUserFilter(JoinPoint joinPoint) throws AccessDeniedException {
        Object target = joinPoint.getTarget();
        if (!(target instanceof UserAwareRepository)) {
            return;
        }
        UUID authenticatedUserId = authService.getLoggedUserID();
        Session session = entityManager.unwrap(Session.class);
        Filter filter = session.enableFilter("userFilter");
        filter.setParameter("userId", authenticatedUserId);
    }
}
