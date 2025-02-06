package uit.ac.ma.est.kessabpro.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import uit.ac.ma.est.kessabpro.models.entities.User;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByPhoneOrUsername(String phone, String username);
    Optional<User> findById(UUID id);
    boolean existsByEmail(String email);
    boolean existsByPhone(String phone);
}
