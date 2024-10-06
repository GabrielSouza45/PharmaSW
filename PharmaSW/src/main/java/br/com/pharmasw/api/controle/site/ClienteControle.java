package br.com.pharmasw.api.controle.site;

import br.com.pharmasw.api.servico.site.ClienteServico;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("cliente-controle")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ClienteControle {

    @Autowired
    private ClienteServico clienteServico;


}
