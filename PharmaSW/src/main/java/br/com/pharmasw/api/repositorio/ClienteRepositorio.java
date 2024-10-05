package br.com.pharmasw.api.repositorio;

import br.com.pharmasw.api.modelo.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClienteRepositorio extends JpaRepository<Cliente, Long> {

    @Override
    public List<Cliente> findAll();
    public Cliente findClienteByEmailAndSenha(String email, String senha);
    public Cliente findClienteByEmail(String email);
}
