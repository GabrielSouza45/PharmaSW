package br.com.pharmasw.api.service;

import br.com.pharmasw.api.modelo.Usuario;
import br.com.pharmasw.api.modelo.enums.Status;
import br.com.pharmasw.api.repositorio.UsuarioRepositorio;
import br.com.pharmasw.api.service.helpers.DataHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UsuarioServico {

    @Autowired
    private UsuarioRepositorio usuarioRepositorio;


    //lista todos os usuários
    public Iterable<Usuario> listarTodos() {
        return usuarioRepositorio.findAll();
    }


    public ResponseEntity<?> cadastrar(Usuario usuario) {

        // Verificar se o email já existe
        if (usuarioRepositorio.findUsuarioByEmailAndStatus(usuario.getEmail(), Status.ATIVO) != null){
            return new ResponseEntity<>("Email já existe!", HttpStatus.UNAUTHORIZED);
        }

        // Verificar se o CPF já existe
        if (usuarioRepositorio.findByCpfAndStatus(usuario.getCpf(), Status.ATIVO) != null){
            return new ResponseEntity<>("CPF já cadastrado!", HttpStatus.UNAUTHORIZED);
        }

        // Encriptar a senha
        usuario.setSenha(new BCryptPasswordEncoder().encode(usuario.getSenha()));

        // Definir o usuário como ativo
        usuario.setStatus(Status.ATIVO);

        //Data da criação do cadastro
        usuario.setDataIni(DataHelper.getDataHora());

        // Salvar o usuário no banco de dados
        Usuario usuarioSalvo = usuarioRepositorio.save(usuario);
        usuarioSalvo.setSenha(null);
        usuarioSalvo.setCpf(null);

        return new ResponseEntity<> (usuarioSalvo, HttpStatus.OK);
    }
}
