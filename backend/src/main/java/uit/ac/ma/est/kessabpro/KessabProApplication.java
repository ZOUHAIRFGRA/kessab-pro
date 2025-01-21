package uit.ac.ma.est.kessabpro;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class KessabProApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(KessabProApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		//seeders
		System.out.println("print bla bla");
	}
}
