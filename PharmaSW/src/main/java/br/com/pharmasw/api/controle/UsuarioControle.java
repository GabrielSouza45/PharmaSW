package br.com.pharmasw.api.controle;

import br.com.pharmasw.api.modelo.RetornoUsuarioDTO;
import br.com.pharmasw.api.modelo.Usuario;
import br.com.pharmasw.api.modelo.enums.Status;
import br.com.pharmasw.api.service.UsuarioServico;

import java.util.ArrayList;
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
 
     @PostMapping("/listar-todos-usuarios")
     @CrossOrigin(origins = "*", allowedHeaders = "*")
     public ResponseEntity<?> listarTodosUsuarios() {

         //Chamando ativos e inativos
         List<Usuario>usuariosGeral = usuarioServico.listarTodosUsuarios();

         return new ResponseEntity<>(constroiRetornoUsuarioDTO(usuariosGeral), HttpStatus.OK);
     }

     private List<RetornoUsuarioDTO> constroiRetornoUsuarioDTO(List<Usuario> usuarios){

             List<RetornoUsuarioDTO> retorno = new ArrayList<>();
             for (Usuario usuario : usuarios) {
                 retorno.add(new RetornoUsuarioDTO(usuario));
             }

             return retorno;
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

    @PutMapping("/mudar-status")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public ResponseEntity<?> alterarStatusUsuario(@RequestBody Usuario usuario){

         if (usuario.getId() == null){
             return ResponseEntity.badRequest().body("Id não pode ser null!");
         }

        return usuarioServico.alterarStatusUsuario(usuario);
    }

}
