package br.com.pharmasw.api.controle;

import br.com.pharmasw.api.modelo.Usuario;
import br.com.pharmasw.api.modelo.enums.Status;
import br.com.pharmasw.api.service.UsuarioServico;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/usuario-controle")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UsuarioControle {

    @Autowired
    private UsuarioServico usuarioServico;


     //Listagem de usuários

     @PostMapping("/listar-usuarios-ativos")
     @CrossOrigin(origins = "*", allowedHeaders = "*")
     public ResponseEntity<?> listarUsuariosAtivos() {
 
         //Chamando ativos
         List<Usuario>usuariosAtivos = usuarioServico.listarUsuariosAtivos(); 
 
         // -> return usuarioServico.listarAtivos();
 
         return new ResponseEntity<>(usuariosAtivos, HttpStatus.OK);
     }
 
     @PostMapping("/listar-todos-Usuarios")
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
    public ResponseEntity<?> cadastrarUsuario(Usuario usuario) {

        return usuarioServico.cadastrar(usuario);
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


}
