package uit.ac.ma.est.kessabpro;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import uit.ac.ma.est.kessabpro.seeders.*;

@SpringBootApplication
@EnableJpaAuditing

public class KessabProApplication implements CommandLineRunner {

	@Autowired private AnimalSeeder animalSeeder;
	@Autowired private BuyerSaleTransactionSeeder buyerSaleTransactionSeeder;
	@Autowired private UserSeeder userSeeder;

	public static void main(String[] args) {
		SpringApplication.run(KessabProApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		animalSeeder.seedData();
		userSeeder.seedData();
		buyerSaleTransactionSeeder.seedData();
	}
}
