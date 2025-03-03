package uit.ac.ma.est.kessabpro.services.interfaces;

import uit.ac.ma.est.kessabpro.models.entities.User;

import java.nio.file.AccessDeniedException;
import java.util.UUID;

public interface IAuthService {
    public User getLoggedUser() throws AccessDeniedException;
    public UUID getLoggedUserID();
}
