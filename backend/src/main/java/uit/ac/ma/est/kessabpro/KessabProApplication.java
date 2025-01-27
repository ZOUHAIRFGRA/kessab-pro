package uit.ac.ma.est.kessabpro;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import uit.ac.ma.est.kessabpro.seeders.AnimalSeeder;

@SpringBootApplication
public class KessabProApplication implements CommandLineRunner {

	@Autowired
	private AnimalSeeder seeder;

	public static void main(String[] args) {
		SpringApplication.run(KessabProApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		seeder.seedData();
	}
}
