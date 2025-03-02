package uit.ac.ma.est.kessabpro.services.interfaces;

import uit.ac.ma.est.kessabpro.models.entities.User;

import java.util.UUID;

public interface IAuthService {
    public User getLoggedUser();
    public UUID getLoggedUserID();
}
