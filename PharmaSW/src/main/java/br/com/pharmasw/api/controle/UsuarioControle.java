package br.com.pharmasw.api.controle;

import br.com.pharmasw.api.modelo.Usuario;
import br.com.pharmasw.api.service.UsuarioServico;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/usuario-controle")
@PreAuthorize("hasRole('Admin')")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UsuarioControle {

    @Autowired
    private UsuarioServico usuarioServico;


    @PostMapping("/listar-todos")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public ResponseEntity<?> listarTodosUsuarios(Usuario usuario) {

        // Chamar Usuario servico para listar todos os ATIVOS
        // -> return usuarioServico.listarTodos();

        return new ResponseEntity<>(HttpStatus.OK);
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


    @PostMapping("/desativar")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public ResponseEntity<?> desativarUsuario(Usuario usuario) {

        // Chamar Usuario servico para desativar usuario ativo

        // -> return usuarioServico.desativarUsuario();


        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/{usuarioId}/status")
    public ResponseEntity<?> alterarStatusUsuario(
            @PathVariable Long usuarioId,
            @RequestParam boolean ativo) {

        return usuarioServico.alterarStatusUsuario(usuarioId, ativo);
    }


}
