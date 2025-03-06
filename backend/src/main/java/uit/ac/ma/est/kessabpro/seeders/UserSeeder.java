package uit.ac.ma.est.kessabpro.seeders;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import uit.ac.ma.est.kessabpro.models.entities.User;
import uit.ac.ma.est.kessabpro.repositories.UserRepository;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Collections;
import java.util.UUID;

@Component
public class UserSeeder {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

//    @PostConstruct
//    public void seedData() {
//        if (userRepository.count() == 0) {
//            User user1 = User.builder()
//                    .username("admin")
//                    .email("admin@gmail.com")
//                    .phone("123456789")
//                    .address("123 Admin Street")
//                    .password(passwordEncoder.encode("admin"))
//                    .build();
//
//
//
//            userRepository.saveAll(Collections.singletonList(user1));
//            System.out.println("Seeding for users completed!");
//        } else {
//            System.out.println("Users already seeded.");
//        }
//    }

}
