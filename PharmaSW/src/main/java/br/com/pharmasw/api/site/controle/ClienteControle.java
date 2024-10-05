package br.com.pharmasw.api.site.controle;

import br.com.pharmasw.api.modelo.Cliente;
import br.com.pharmasw.api.site.servico.ClienteServico;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("cliente-controle")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ClienteControle {

    @Autowired
    private ClienteServico clienteServico;


}
