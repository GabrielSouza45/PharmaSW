package br.com.pharmasw.api.servico.site.Interfaces;

import br.com.pharmasw.api.modelo.Cliente;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

@Repository
public interface IClienteServico {

        UserDetails findClienteByEmail(String email);

        boolean existsByEmail(String email);
        boolean existsByEmailOrCpf(String email, String cpf);
        Cliente findClienteByEmailAndSenha(String email, String senha);

        Cliente findByEmail(String email);
    }