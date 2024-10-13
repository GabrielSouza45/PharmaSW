package br.com.pharmasw.api.controle.site;

import br.com.pharmasw.api.modelo.Cliente;
import br.com.pharmasw.api.modelo.Endereco;
import br.com.pharmasw.api.modelo.Filtros;
import br.com.pharmasw.api.repositorio.ClienteRepositorio;
import br.com.pharmasw.api.servico.site.EnderecoServico;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/endereco-controle")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class EnderecoControle {

    @Autowired
    private EnderecoServico enderecoServico;
    @Autowired
    private ClienteRepositorio clienteRepositorio;

    @PostMapping("/listar-por-cliente")
    @PreAuthorize("hasRole('CLIENTE') or hasRoler('ADMIN')")
    public ResponseEntity<?> listarPorCliente(@RequestBody Filtros filtro) {
        if (filtro.getId() == null)
            return new ResponseEntity<>("Cliente não pode ser nulo.", HttpStatus.BAD_REQUEST);

        return enderecoServico.listarPorCliente(filtro.getId());
    }

    @PostMapping("/cadastrar")
    @PreAuthorize("hasRole('CLIENTE') or hasRoler('ADMIN')")
    public ResponseEntity<?> cadastrarEndereco(@Valid @RequestBody Endereco endereco) {

        Optional<Cliente> clienteOpt = clienteRepositorio.findById(endereco.getIdClienteCadastro());
        if (clienteOpt.isEmpty())
            return new ResponseEntity<>("Cliente não localizado", HttpStatus.BAD_GATEWAY);

        Cliente cliente = clienteOpt.get();

        return enderecoServico.cadastrar(endereco, cliente);
    }

    @PutMapping("/alterar-padrao/{idEndereco}")
    @PreAuthorize("hasRole('CLIENTE') or hasRole('ADMIN')")
    public ResponseEntity<?> alterarEnderecoPadrao(@PathVariable Long idEndereco) {
        try {
            return enderecoServico.alterarEnderecoPadrao(idEndereco);
        } catch (Exception e) {
            return new ResponseEntity<>("Erro ao atualizar o endereço padrão", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
