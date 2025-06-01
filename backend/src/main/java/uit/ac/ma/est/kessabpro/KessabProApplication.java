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
        // Configure Dotenv to ignore if .env is missing (e.g., in Azure)
        Dotenv dotenv = Dotenv.configure().ignoreIfMissing().load();

        // Set system properties only if values are present in .env
        // These correspond to the placeholders in your app.props
        setSystemPropertyIfPresent(dotenv, "JWT_SECRET");
        setSystemPropertyIfPresent(dotenv, "ADMIN_USERNAME");
        setSystemPropertyIfPresent(dotenv, "ADMIN_PASSWORD");
        setSystemPropertyIfPresent(dotenv, "SPRING_DATASOURCE_URL");
        setSystemPropertyIfPresent(dotenv, "SPRING_DATASOURCE_USERNAME");
        setSystemPropertyIfPresent(dotenv, "SPRING_DATASOURCE_PASSWORD");

        SpringApplication.run(KessabProApplication.class, args);
    }

    private static void setSystemPropertyIfPresent(Dotenv dotenv, String key) {
        String value = dotenv.get(key);
        if (value != null) {
            System.setProperty(key, value);
            // For debugging, you might want to log this locally:
            // System.out.println("Setting system property from .env: " + key);
        }
    }

    // @Bean
    // ApplicationRunner seedDatabase(IDatabaseSeederService databaseSeeder) {
    //     return args -> databaseSeeder.seed();
    // }
}