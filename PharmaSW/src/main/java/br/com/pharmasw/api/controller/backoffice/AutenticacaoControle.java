package br.com.pharmasw.api.controller.backoffice;

import br.com.pharmasw.api.infra.security.TokenService;
import br.com.pharmasw.api.model.Cliente;
import br.com.pharmasw.api.model.dto.AuthDTO;
import br.com.pharmasw.api.model.Usuario;
import br.com.pharmasw.api.model.enums.Grupo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("auth")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AutenticacaoControle {

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity<?> loginUsuario(@RequestBody Usuario usuario) {

        var usernamePassword = new UsernamePasswordAuthenticationToken(
                usuario.getEmail(),
                usuario.getSenha()
        );
        var auth = this.authenticationManager.authenticate(usernamePassword);
        var token = tokenService.gerarToken((Usuario) auth.getPrincipal());

        String nome = ((Usuario) auth.getPrincipal()).getNome();
        Grupo grupo = ((Usuario) auth.getPrincipal()).getGrupo();
        Long id = ((Usuario) auth.getPrincipal()).getId();

        return ResponseEntity.ok(new AuthDTO<>(token, nome, grupo, id));

    }

    @PostMapping("/login-site")
    public ResponseEntity<?> loginCliente(@RequestBody Cliente cliente) {

        var usernamePassword = new UsernamePasswordAuthenticationToken(
                cliente.getEmail(),
                cliente.getSenha()
        );
        var auth = this.authenticationManager.authenticate(usernamePassword);
        var token = tokenService.gerarToken((Cliente) auth.getPrincipal());

        String nome = ((Cliente) auth.getPrincipal()).getNome();
        String grupo = "CLIENTE";
        Long id = ((Cliente) auth.getPrincipal()).getId();

        return ResponseEntity.ok(new AuthDTO<>(token, nome, grupo, id));

    }
}
