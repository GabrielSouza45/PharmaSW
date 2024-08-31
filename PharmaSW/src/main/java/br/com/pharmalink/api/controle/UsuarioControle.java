package br.com.pharmalink.api.controle;

import br.com.pharmalink.api.modelo.Produto;
import br.com.pharmalink.api.modelo.Usuario;
import br.com.pharmalink.api.modelo.enums.Status;
import br.com.pharmalink.api.service.UsuarioServico;

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


    @PostMapping("/login")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public ResponseEntity<?> loginUsuario(Usuario usuario) {

        if (usuario.getEmail().isBlank()) {
            return new ResponseEntity<>("Email é obrigatório!", HttpStatus.BAD_REQUEST);

        } else if (usuario.getSenha().isBlank()) {
            return new ResponseEntity<>("Senha é obrigatório!", HttpStatus.BAD_REQUEST);

        }

        return usuarioServico.loginUsuario(usuario);

    }

//++

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

        // -> return usuarioServico.listarTodos();

        return new ResponseEntity<>(usuariosGeral, HttpStatus.OK);
    }

    @PostMapping("/listar-usuarios-inativos")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public ResponseEntity<?> listarUsuariosInativos() {

        List<Usuario>usuariosInativos = usuarioServico.listarUsuariosInativos(); 

        // -> return usuarioServico.listarInativos();

        return new ResponseEntity<>(usuariosInativos, HttpStatus.OK);
    }
//++

    @PostMapping("/cadastrar")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public ResponseEntity<?> cadastrarUsuario(Usuario usuario) {

        // Aqui deve ser validado se o usuario logado é do grupo administrador
        // validar se estão chegando todos os itens necessario do usuario (email, senha, ...)
        // Validacao de email e senha devem ser feitas no front end e conferidas no UsuarioServico
        // Chamar Usuario servico para cadastar usuario

        // -> return usuarioServico.cadastrarUsuario();


        return new ResponseEntity<>(HttpStatus.OK);

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
