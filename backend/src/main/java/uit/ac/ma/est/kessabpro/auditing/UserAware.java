package uit.ac.ma.est.kessabpro.auditing;

import uit.ac.ma.est.kessabpro.models.entities.User;

public interface UserAware {
    User getUser();
    void setUser(User user);
}

