package br.com.pharmasw.api.controle;

import br.com.pharmasw.api.modelo.Usuario;
import br.com.pharmasw.api.service.UsuarioServico;
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


    @PostMapping("/listar-todos")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public ResponseEntity<?> listarTodosUsuarios(Usuario usuario) {

        // Chamar Usuario servico para listar todos os ATIVOS
        // -> return usuarioServico.listarTodos();

        return new ResponseEntity<>(HttpStatus.OK);
    }


    @PostMapping("/cadastrar")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public ResponseEntity<?> cadastrarUsuario(Usuario usuario) {

        return usuarioServico.cadastrar(usuario);
    }


    @PostMapping("/desativar")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public ResponseEntity<?> desativarUsuario(Usuario usuario) {

        // Chamar Usuario servico para desativar usuario ativo

        // -> return usuarioServico.desativarUsuario();


        return new ResponseEntity<>(HttpStatus.OK);
    }


}
