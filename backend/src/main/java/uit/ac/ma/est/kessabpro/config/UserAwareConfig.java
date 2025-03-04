package uit.ac.ma.est.kessabpro.config;

import org.hibernate.annotations.FilterDef;
import org.hibernate.annotations.ParamDef;

import java.util.UUID;

@FilterDef(name = "userFilter", parameters = @ParamDef(name = "userId", type = UUID.class))
public class UserAwareConfig {
}
