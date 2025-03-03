package uit.ac.ma.est.kessabpro.aspect;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.*;
import org.springframework.stereotype.Component;
import uit.ac.ma.est.kessabpro.auditing.UserAware;
import uit.ac.ma.est.kessabpro.services.interfaces.IAuthService;

@Aspect
@Component
public class UserAwareAspect {

    IAuthService authService;

    public void UserAware(IAuthService authService) {
        this.authService = authService;
    }

    @Before("execution(* org.springframework.data.repository.CrudRepository+.save(..))")
    public void setCreatedBy(JoinPoint joinPoint) {
        Object entity = joinPoint.getArgs()[0];
        if (entity instanceof UserAware) {
            System.out.println("opplaa");
//            System.out.println(authService.getLoggedUserID());
        }
//            ((UserAware) entity).setCreatedBy(getCurrentUsername());
    }
}
