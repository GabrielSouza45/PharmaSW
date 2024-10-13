package br.com.pharmasw.api.controle.site;

import br.com.pharmasw.api.modelo.Cliente;
import br.com.pharmasw.api.modelo.Filtros;
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
        if (cliente.getEmail() == null)
            return new ResponseEntity<>("Email é obrigatório!", HttpStatus.BAD_REQUEST);

        return clienteServico.alterar(cliente);
    @PostMapping("/listar-cliente-id")
    @PreAuthorize("hasRole('CLIENTE') or hasRole('ADMIN')")
    public ResponseEntity<?> listarClientePorId(@RequestBody Filtros filtro){
        if (filtro.getId() == null)
            return new ResponseEntity<>("Cliente não pode ser nulo.", HttpStatus.BAD_REQUEST);

        return clienteServico.listarClientePorId(filtro.getId());
    }
}
