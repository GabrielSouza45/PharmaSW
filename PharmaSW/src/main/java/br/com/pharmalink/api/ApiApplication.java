package br.com.pharmalink.api;

import br.com.pharmalink.api.service.helpers.VerificaAdministradorPadrao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ApiApplication {

	@Autowired
	private static VerificaAdministradorPadrao verificaAdministradorPadrao;

	public static void main(String[] args) {

		verificaAdministradorPadrao.verificaPrimeiroUsuarioExistente();
		SpringApplication.run(ApiApplication.class, args);
	}

}
