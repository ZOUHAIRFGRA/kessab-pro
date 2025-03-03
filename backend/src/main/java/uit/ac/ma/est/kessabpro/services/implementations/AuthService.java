package uit.ac.ma.est.kessabpro.services.implementations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import uit.ac.ma.est.kessabpro.models.entities.User;
import uit.ac.ma.est.kessabpro.repositories.UserRepository;
import uit.ac.ma.est.kessabpro.services.interfaces.IAuthService;

import java.nio.file.AccessDeniedException;
import java.util.UUID;

@Service
public class AuthService implements IAuthService {

    UserRepository userRepository;

    @Autowired
    public AuthService( UserRepository userRepository) {
            this.userRepository = userRepository;
    }

    @Override
    public User getLoggedUser() throws AccessDeniedException {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.isAuthenticated()) {
            String username = auth.getName();
            System.out.println("username");
            System.out.println(username);
//            return userRepository.findByUsername(username)
//                    .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        }
        throw new AccessDeniedException("No authenticated user");
    }

    @Override
    public UUID getLoggedUserID() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User loggedInUser = (User) authentication.getPrincipal();
        return loggedInUser.getId();
    }
}
