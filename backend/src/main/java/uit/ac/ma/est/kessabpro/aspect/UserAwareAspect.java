package uit.ac.ma.est.kessabpro.aspect;

import jakarta.persistence.EntityNotFoundException;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;
import uit.ac.ma.est.kessabpro.auditing.UserAware;
import uit.ac.ma.est.kessabpro.models.entities.User;
import uit.ac.ma.est.kessabpro.repositories.UserRepository;
import uit.ac.ma.est.kessabpro.services.interfaces.IAuthService;

import java.nio.file.AccessDeniedException;

@Aspect
@Component
public class UserAwareAspect {

    IAuthService authService;
    UserRepository userRepository;

    @Autowired
    public void UserAware(IAuthService authService, UserRepository userRepository) {
        this.authService = authService;
        this.userRepository = userRepository;
    }

    @Before("execution(* org.springframework.data.repository.CrudRepository+.save(..))")
    public void setCreatedBy(JoinPoint joinPoint) throws AccessDeniedException {
        Object entity = joinPoint.getArgs()[0];
        if (entity instanceof UserAware ) {
            ((UserAware) entity).setUser(authService.getLoggedUser());
        }
    }

}
