package com.zan.mangatrack;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class MangatrackApplication {

	public static void main(String[] args) {
		SpringApplication.run(MangatrackApplication.class, args);
	}

}
