package uit.ac.ma.est.kessabpro.services.implementations;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import uit.ac.ma.est.kessabpro.models.entities.User;
import uit.ac.ma.est.kessabpro.repositories.UserRepository;
import uit.ac.ma.est.kessabpro.services.interfaces.IUserService;

import java.util.Optional;
import java.util.UUID;

@Service
public class UserService implements IUserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User getAuthenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new RuntimeException("User is not authenticated");
        }

        String username = authentication.getName();
        return userRepository.findByPhoneOrUsername(username, username)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Override
    public User updateUser(UUID id, User updatedUser) { // Changed Long to UUID
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (updatedUser.getEmail() != null && userRepository.existsByEmail(updatedUser.getEmail())
                && !existingUser.getEmail().equals(updatedUser.getEmail())) {
            throw new RuntimeException("Email already in use");
        }

        if (updatedUser.getPhone() != null && userRepository.existsByPhone(updatedUser.getPhone())
                && !existingUser.getPhone().equals(updatedUser.getPhone())) {
            throw new RuntimeException("Phone number already in use");
        }

        if (updatedUser.getUsername() != null) {
            existingUser.setUsername(updatedUser.getUsername());
        }
        if (updatedUser.getEmail() != null) {
            existingUser.setEmail(updatedUser.getEmail());
        }
        if (updatedUser.getPhone() != null) {
            existingUser.setPhone(updatedUser.getPhone());
        }
        if (updatedUser.getAddress() != null) {
            existingUser.setAddress(updatedUser.getAddress());
        }

        return userRepository.save(existingUser);
    }
}
