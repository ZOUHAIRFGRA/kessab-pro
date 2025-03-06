package uit.ac.ma.est.kessabpro.services.contracts;

import uit.ac.ma.est.kessabpro.models.entities.User;
import java.util.List;
import java.util.UUID;

public interface IUserService {
    User getAuthenticatedUser();
    User updateUser(UUID id, User updatedUser);
    List<User> getAllUsers();
    User getUserById(UUID id);
}
