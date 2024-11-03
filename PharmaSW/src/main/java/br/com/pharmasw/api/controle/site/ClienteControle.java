package br.com.pharmasw.api.controle.site;

import br.com.pharmasw.api.modelo.Cliente;
import br.com.pharmasw.api.modelo.Filtros;
import br.com.pharmasw.api.servico.responseBuilder.ResponseBuilder;
import br.com.pharmasw.api.servico.site.ClienteServico;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cliente-controle")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ClienteControle {

    @Autowired
    private ClienteServico clienteServico;

    @PutMapping("/alterar-cliente")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public ResponseEntity<?> alterarCliente(@RequestBody Cliente cliente) {
        if (cliente.getId() == null)
            return new ResponseBuilder().build("Id é obrigatório!", HttpStatus.BAD_REQUEST);
        if (cliente.getNome() == null)
            return new ResponseBuilder().build("Nome é obrigatório!", HttpStatus.BAD_REQUEST);
        if (cliente.getDataNascimento() == null)
            return new ResponseBuilder().build("Data de Nascimento é obrigatório!", HttpStatus.BAD_REQUEST);
        if (cliente.getGenero() == null)
            return new ResponseBuilder().build("Gênero é obrigatório!", HttpStatus.BAD_REQUEST);

        try {
            return clienteServico.alterar(cliente);
        } catch (Exception e) {
            return new ResponseBuilder().build("Erro ao alterar o cliente.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/listar-cliente-id")
        @PreAuthorize("hasRole('CLIENTE') or hasRole('ADMIN')")
        public ResponseEntity<?> listarClientePorId (@RequestBody Filtros filtro){
            if (filtro.getId() == null)
                return new ResponseBuilder().build("Cliente não pode ser nulo.", HttpStatus.BAD_REQUEST);

            return clienteServico.listarClientePorId(filtro.getId());
        }
    }

