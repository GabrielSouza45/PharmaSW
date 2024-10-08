package br.com.pharmasw.api.servico.site;

import br.com.pharmasw.api.modelo.Cliente;
import br.com.pharmasw.api.modelo.Retorno.ClienteDTO;
import br.com.pharmasw.api.repositorio.ClienteRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class ClienteServico {
    @Autowired
    private ClienteRepositorio clienteRepositorio;

    // CADASTRAR CLIENTE
    public ResponseEntity<?> cadastrar (Cliente cliente){

        boolean exists = clienteRepositorio.existsByEmailOrCpf(cliente.getEmail(), cliente.getCpf());
        if (exists)
            return new ResponseEntity<>("Usuário já cadastrado.", HttpStatus.UNAUTHORIZED);

        cliente.setSenha(new BCryptPasswordEncoder().encode(cliente.getSenha()));

        ClienteDTO dto = new ClienteDTO(clienteRepositorio.save(cliente));

        return new ResponseEntity<>(dto, HttpStatus.CREATED);
    }

}
