package br.com.pharmasw.api.infra.security;

import br.com.pharmasw.api.modelo.enums.Status;
import br.com.pharmasw.api.repositorio.ClienteRepositorio;
import br.com.pharmasw.api.repositorio.UsuarioRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AuthorizationService implements UserDetailsService {

    @Autowired
    private UsuarioRepositorio usuarioRepositorio;
    @Autowired
    private ClienteRepositorio clienteRepositorio;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        UserDetails user = usuarioRepositorio.findByEmailAndStatus(email, Status.ATIVO);
        if (user == null)
            user = clienteRepositorio.findClienteByEmail(email);

        return user;

    }
}
