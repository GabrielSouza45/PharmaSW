package br.com.pharmasw.api.repositorio;

import br.com.pharmasw.api.modelo.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClienteRepositorio extends JpaRepository<Cliente, Long> {

    UserDetails findClienteByEmail(String email);

    boolean existsByEmail(String email);
    boolean existsByEmailOrCpf(String email, String cpf);
    Cliente findClienteByEmailAndSenha(String email, String senha);

}
