package uit.ac.ma.est.kessabpro.services.implementations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import uit.ac.ma.est.kessabpro.models.entities.User;
import uit.ac.ma.est.kessabpro.repositories.UserRepository;
import uit.ac.ma.est.kessabpro.services.contracts.IAuthService;

import java.nio.file.AccessDeniedException;
import java.util.UUID;

@Service
public class AuthService implements IAuthService {

    private final UserService userService;
    UserRepository userRepository;

    @Autowired
    public AuthService(UserRepository userRepository, UserService userService) {
        this.userRepository = userRepository;
        this.userService = userService;
    }

    @Override
    public User getLoggedUser() throws AccessDeniedException {
        UUID userId = getLoggedUserID();
        return userService.getUserById(getLoggedUserID());
    }

    @Override
    public UUID getLoggedUserID() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            User loggedInUser = (User) authentication.getPrincipal();
            return loggedInUser.getId();
        } catch (Exception e) {
            throw new AuthenticationException("") {
                @Override
                public String getMessage() {
                    return "error, trying to access authenticated user in non-authenticated context";
                }
            };
        }

    }
}
