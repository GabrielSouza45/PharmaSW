package br.com.pharmasw.api.backoffice.controle;

import br.com.pharmasw.api.modelo.Filtros;
import br.com.pharmasw.api.modelo.Usuario;
import br.com.pharmasw.api.backoffice.servico.UsuarioServico;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/usuario-controle")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@PreAuthorize("hasRole('ADMIN')")
public class UsuarioControle {

    @Autowired
    private UsuarioServico usuarioServico;
 
     @PostMapping("/listar")
     @CrossOrigin(origins = "*", allowedHeaders = "*")
     public ResponseEntity<?> listarUsuarios(@RequestBody Filtros filtros) {

         return new ResponseEntity<>(usuarioServico.listarUsuarios(filtros), HttpStatus.OK);

     }
     

    @PostMapping("/cadastrar")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> cadastrarUsuario(@RequestBody Usuario usuario) {
        if (usuario.getEmail().isBlank()
                || usuario.getSenha().isBlank()
                || usuario.getCpf() == null
                || usuario.getNome().isBlank()
                || usuario.getGrupo() == null)
            return ResponseEntity.badRequest().build();

        return usuarioServico.cadastrar(usuario);
    }

    @PutMapping("/editar")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public ResponseEntity<?> alterarUsuario(@RequestBody  Usuario usuario) {
        if (usuario.getEmail() == null)
            return new ResponseEntity<>("Email é obrigatório!", HttpStatus.BAD_REQUEST);

        return usuarioServico.alterar(usuario);
    }

    @PutMapping("/mudar-status")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public ResponseEntity<?> alterarStatusUsuario(@RequestBody Usuario usuario) {
        if (usuario.getId() == null) {
            return ResponseEntity.badRequest().body("Id não pode ser null!");
        }

        return usuarioServico.alterarStatusUsuario(usuario);
    }

}