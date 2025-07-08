package uit.ac.ma.est.kessabpro;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.web.config.EnableSpringDataWebSupport;
import io.github.cdimascio.dotenv.Dotenv;
import uit.ac.ma.est.kessabpro.services.contracts.IDatabaseSeederService;
import static org.springframework.data.web.config.EnableSpringDataWebSupport.PageSerializationMode.VIA_DTO;
@SpringBootApplication
@EnableJpaAuditing
@EnableSpringDataWebSupport(pageSerializationMode = VIA_DTO)
public class KessabProApplication {

    public static void main(String[] args) {
        Dotenv dotenv = Dotenv.load();
        System.setProperty("JWT_SECRET", dotenv.get("JWT_SECRET"));
        System.setProperty("ADMIN_USERNAME", dotenv.get("ADMIN_USERNAME"));
        System.setProperty("ADMIN_PASSWORD", dotenv.get("ADMIN_PASSWORD"));
        System.setProperty("DB_USERNAME", dotenv.get("DB_USERNAME"));
        System.setProperty("DB_PASSWORD", dotenv.get("DB_PASSWORD"));
        System.setProperty("DB_URL", dotenv.get("DB_URL"));
        SpringApplication.run(KessabProApplication.class, args);
    }

    // @Bean
    // ApplicationRunner seedDatabase(IDatabaseSeederService databaseSeeder) {
    //     return args -> databaseSeeder.seed();
    // }


}