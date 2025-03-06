package uit.ac.ma.est.kessabpro.seeders.factory;

import java.util.List;

public interface SeederFactory<T> {
    List<T> create(int count);
}
