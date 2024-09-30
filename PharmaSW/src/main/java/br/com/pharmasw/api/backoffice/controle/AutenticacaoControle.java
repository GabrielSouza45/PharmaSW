package br.com.pharmasw.api.backoffice.controle;

import br.com.pharmasw.api.infra.security.TokenService;
import br.com.pharmasw.api.modelo.Retorno.AuthDTO;
import br.com.pharmasw.api.modelo.Usuario;
import br.com.pharmasw.api.modelo.enums.Grupo;
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

        return ResponseEntity.ok(new AuthDTO(token, nome, grupo, id));

    }
}
