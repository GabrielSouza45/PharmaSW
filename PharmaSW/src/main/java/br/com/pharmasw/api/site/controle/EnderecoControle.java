package br.com.pharmasw.api.site.controle;

import br.com.pharmasw.api.modelo.Cliente;
import br.com.pharmasw.api.modelo.Endereco;
import br.com.pharmasw.api.repositorio.ClienteRepositorio;
import br.com.pharmasw.api.site.servico.ViaCepAPI;
import br.com.pharmasw.api.site.servico.EnderecoServico;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/endereco")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class EnderecoControle {

    @Autowired
    private EnderecoServico enderecoServico;
    @Autowired
    private ClienteRepositorio clienteRepositorio;


    @PostMapping("/cadastrar")
    @PreAuthorize("hasRole('CLIENTE') or hasRoler('ADMIN')")
    public ResponseEntity<?> cadastrarEndereco(@Valid @RequestBody Endereco endereco){

        Optional<Cliente> clienteOpt = clienteRepositorio.findById(endereco.getIdClienteCadastro());
        if (clienteOpt.isEmpty())
            return new ResponseEntity<>("Cliente não localizado", HttpStatus.BAD_GATEWAY);

        Cliente cliente = clienteOpt.get();

        return enderecoServico.cadastrar(endereco, cliente);
    }

}
