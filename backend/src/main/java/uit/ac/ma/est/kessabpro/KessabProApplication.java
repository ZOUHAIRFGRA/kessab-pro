package uit.ac.ma.est.kessabpro;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.core.env.Environment;
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
        // Check if we're running in cloud environment (Azure)
        boolean isCloudEnvironment = System.getenv("WEBSITE_SITE_NAME") != null;

        if (!isCloudEnvironment) {
            // Load environment variables from .env file for local development
            try {
                Dotenv dotenv = Dotenv.load();
                System.setProperty("JWT_SECRET", dotenv.get("JWT_SECRET"));
                System.setProperty("ADMIN_USERNAME", dotenv.get("ADMIN_USERNAME"));
                System.setProperty("ADMIN_PASSWORD", dotenv.get("ADMIN_PASSWORD"));
                System.setProperty("DB_USERNAME", dotenv.get("DB_USERNAME"));
                System.setProperty("DB_PASSWORD", dotenv.get("DB_PASSWORD"));
                System.setProperty("DB_URL", dotenv.get("DB_URL"));
            } catch (Exception e) {
                System.err.println("Warning: .env file not found or could not be loaded. Make sure environment variables are set properly.");
            }
        }

        // Start the application
        SpringApplication.run(KessabProApplication.class, args);
    }

    @Bean
    ApplicationRunner seedDatabase(IDatabaseSeederService databaseSeeder, Environment env) {
        return args -> {
            // Only seed database if not in production or if explicitly enabled
            if (!env.matchesProfiles("prod") || Boolean.parseBoolean(env.getProperty("app.database.seed", "false"))) {
                databaseSeeder.seed();
            }
        };
    }


}