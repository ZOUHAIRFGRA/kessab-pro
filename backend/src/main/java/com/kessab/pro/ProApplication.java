package com.kessab.pro;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ProApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(ProApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		//seeders
		System.out.println("print bla bla");
	}
}
