package br.com.pharmalink.api.service;

import br.com.pharmalink.api.modelo.enums.Status;
import br.com.pharmalink.api.service.helpers.DataHelper;
import br.com.pharmalink.api.service.helpers.EncriptaSenhaUsuario;
import br.com.pharmalink.api.service.helpers.Scan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import br.com.pharmalink.api.modelo.Usuario;
import br.com.pharmalink.api.repositorio.UsuarioRepositorio;

import java.util.Optional;
import java.util.regex.Pattern;

@Service
public class UsuarioServico {

    @Autowired
    private UsuarioRepositorio usuarioRepositorio;
    
    @Autowired
    private EncriptaSenhaUsuario encriptaSenhaUsuario;


    public ResponseEntity<?> loginUsuario(Usuario usuario) {

        try {

            if (senhasValida(usuario)) {

                Usuario usuarioLogado =
                        usuarioRepositorio.findUsuarioByEmailAndStatus(usuario.getEmail(), Status.ATIVO);

                return new ResponseEntity<>(usuarioLogado, HttpStatus.OK);

            } else {
                return new ResponseEntity<>("Login ou senha incorretos!", HttpStatus.UNAUTHORIZED);

            }

        } catch (Error e) {
            e.printStackTrace();
            return new ResponseEntity<>("Erro interno.", HttpStatus.BAD_GATEWAY);
        }

    }

    private boolean senhasValida(Usuario usuario) {
        return encriptaSenhaUsuario.validarSenhas(
                usuario.getEmail(),
                usuario.getSenha()
        );
    }



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
        usuario.setSenha(encriptaSenhaUsuario.encriptar(usuario.getSenha()));

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
