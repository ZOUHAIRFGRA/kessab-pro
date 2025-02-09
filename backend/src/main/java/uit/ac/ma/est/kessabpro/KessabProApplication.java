package uit.ac.ma.est.kessabpro;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.web.config.EnableSpringDataWebSupport;
import uit.ac.ma.est.kessabpro.seeders.*;

import static org.springframework.data.web.config.EnableSpringDataWebSupport.PageSerializationMode.VIA_DTO;

@SpringBootApplication
@EnableJpaAuditing
@EnableSpringDataWebSupport(pageSerializationMode = VIA_DTO)
public class KessabProApplication implements CommandLineRunner {

    @Autowired private AnimalSeeder animalSeeder;
    @Autowired private BuyerSaleTransactionSeeder buyerSaleTransactionSeeder;
    @Autowired private UserSeeder userSeeder;

    public static void main(String[] args) {
        Dotenv dotenv = Dotenv.load();

        System.setProperty("JWT_SECRET", dotenv.get("JWT_SECRET"));
        System.setProperty("ADMIN_USERNAME", dotenv.get("ADMIN_USERNAME"));
        System.setProperty("ADMIN_PASSWORD", dotenv.get("ADMIN_PASSWORD"));

        SpringApplication.run(KessabProApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        animalSeeder.seedData();
        userSeeder.seedData();
        buyerSaleTransactionSeeder.seedData();
    }
}
