package uit.ac.ma.est.kessabpro.aspect;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityNotFoundException;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.*;
import org.aspectj.lang.reflect.MethodSignature;
import org.hibernate.Filter;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;
import uit.ac.ma.est.kessabpro.auditing.UserAware;
import uit.ac.ma.est.kessabpro.auditing.UserSpecification;
import uit.ac.ma.est.kessabpro.models.entities.User;
import uit.ac.ma.est.kessabpro.repositories.UserAwareRepository;
import uit.ac.ma.est.kessabpro.repositories.UserRepository;
import uit.ac.ma.est.kessabpro.services.interfaces.IAuthService;

import java.lang.reflect.Method;
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
        //TODO:remove the second condition
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
        System.out.println("setted");
    }
}
