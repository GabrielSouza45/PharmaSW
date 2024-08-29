package br.com.pharmalink.api.service;

import br.com.pharmalink.api.modelo.enums.Status;
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


    public Usuario cadastrar(Usuario usuario) {
        // Verificar se o email já existe
        if (usuarioRepositorio.findByEmail(usuario.getEmail()).isPresent()) {
            throw new RuntimeException("Email já cadastrado!");
        }

        // Verificar se o CPF já existe
        if (usuarioRepositorio.findByCPF(usuario.getCpf()) != null){
            throw new RuntimeException("CPF já cadastrado!");
        }

        // Encriptar a senha
        usuario.setSenha(new EncriptaSenhaUsuario(usuario.getSenha()));

        // Definir o usuário como ativo
        usuario.setStatus(Status.ATIVO);

        // Salvar o usuário no banco de dados
        return usuarioRepositorio.save(usuario);
    }
    }
