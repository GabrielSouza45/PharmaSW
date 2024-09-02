package br.com.pharmasw.api.controle;

import br.com.pharmasw.api.modelo.Usuario;
import br.com.pharmasw.api.modelo.enums.Status;
import br.com.pharmasw.api.service.UsuarioServico;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
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


     //Listagem de usuários

     @PostMapping("/listar-usuarios-ativos")
     @CrossOrigin(origins = "*", allowedHeaders = "*")
     public ResponseEntity<?> listarUsuariosAtivos() {
 
         //Chamando ativos
         List<Usuario>usuariosAtivos = usuarioServico.listarUsuariosAtivos(); 
  
         return new ResponseEntity<>(usuariosAtivos, HttpStatus.OK);
     }
 
     @PostMapping("/listar-todos-usuarios")
     @CrossOrigin(origins = "*", allowedHeaders = "*")
     public ResponseEntity<?> listarTodosUsuarios() {
 
         //Chamando ativos e inativos
         List<Usuario>usuariosGeral = usuarioServico.listarTodosUsuarios(); 
 
         return new ResponseEntity<>(usuariosGeral, HttpStatus.OK);
     }
 
     @PostMapping("/listar-usuarios-inativos")
     @CrossOrigin(origins = "*", allowedHeaders = "*")
     public ResponseEntity<?> listarUsuariosInativos() {
        
        //Chamando inativos
         List<Usuario>usuariosInativos = usuarioServico.listarUsuariosInativos(); 
  
         return new ResponseEntity<>(usuariosInativos, HttpStatus.OK);
     }


    @PostMapping("/cadastrar")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PreAuthorize("hasRole('Admin')")
    public ResponseEntity<?> cadastrarUsuario(Usuario usuario) {
        System.out.println("Cad User");
        if (usuario.getEmail().isBlank()
                || usuario.getSenha().isBlank()
                || usuario.getCpf() == null
                || usuario.getNome().isBlank())
            return ResponseEntity.badRequest().build();

        return usuarioServico.cadastrar(usuario);
    }


    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public ResponseEntity<?> alterarUsuario(Usuario usuario) {
        if (usuario.getEmail() == null)
            return new ResponseEntity<>("Email é obrigatório!", HttpStatus.BAD_REQUEST);

        return usuarioServico.alterar(usuario);
    }

    @PostMapping("/desativar-usuario")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public ResponseEntity<?> desativarUsuario(@RequestBody Usuario usuario) {
        usuarioServico.desativarUsuario(usuario.getId());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/ativar-usuario")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public ResponseEntity<?> ativarUsuario(@RequestBody Usuario usuario){
        usuarioServico.ativarUsuario(usuario.getId());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/mudar-status")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public ResponseEntity<?> alterarStatusUsuario(@RequestBody Usuario usuario){

         if (usuario.getId() == null){
             return ResponseEntity.badRequest().body("Id não pode ser null!");
         }

        return usuarioServico.alterarStatusUsuario(usuario);
    }

}
