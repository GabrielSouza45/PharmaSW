package br.com.pharmasw.api.servico.site;

import br.com.pharmasw.api.modelo.Cliente;
import br.com.pharmasw.api.modelo.Retorno.ClienteDTO;
import br.com.pharmasw.api.repositorio.ClienteRepositorio;
import br.com.pharmasw.api.servico.responseBuilder.ResponseBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ClienteServico {
    @Autowired
    private ClienteRepositorio clienteRepositorio;

    // CADASTRAR CLIENTE
    public ResponseEntity<?> cadastrar(Cliente cliente) {

        boolean exists = clienteRepositorio.existsByEmailOrCpf(cliente.getEmail(), cliente.getCpf());
        if (exists)
            return new ResponseBuilder().build("Usuário já cadastrado.", HttpStatus.UNAUTHORIZED);

        cliente.setSenha(new BCryptPasswordEncoder().encode(cliente.getSenha()));

        ClienteDTO dto = new ClienteDTO(clienteRepositorio.save(cliente));

        return new ResponseBuilder().build(dto, HttpStatus.CREATED);
    }

    //Alterar Cliente
    public ResponseEntity<?> alterar(Cliente clienteRequest) {
        Optional<Cliente> clienteOpt = clienteRepositorio.findById(clienteRequest.getId());
        if (clienteOpt.isEmpty()) {
            return new ResponseBuilder().build("Cliente não encontrado.", HttpStatus.NOT_FOUND);
        }

        Cliente cliente = clienteOpt.get();

        // Atualiza a senha somente se uma nova senha for fornecida
        if (!clienteRequest.getSenha().isBlank()) {
            String senhaEncriptada = new BCryptPasswordEncoder().encode(clienteRequest.getSenha());
            cliente.setSenha(senhaEncriptada);
        }

        // Atualiza outros campos do cliente

        cliente.setNome(clienteRequest.getNome());
        cliente.setDataNascimento(clienteRequest.getDataNascimento());
        cliente.setGenero(clienteRequest.getGenero());

        clienteRepositorio.save(cliente);
        return new ResponseBuilder().build(HttpStatus.OK);
    }


    public ResponseEntity<?> listarClientePorId(Long id) {

        Optional<Cliente> clienteOpt = clienteRepositorio.findById(id);
        if (clienteOpt.isEmpty())
            return new ResponseBuilder().build("Cliente não encontrado.", HttpStatus.NOT_FOUND);

        Cliente cliente = clienteOpt.get();
        ClienteDTO dto = new ClienteDTO(cliente);

        return new ResponseBuilder().build(dto, HttpStatus.OK);
    }

}
