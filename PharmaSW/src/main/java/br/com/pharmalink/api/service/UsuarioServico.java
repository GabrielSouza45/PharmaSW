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


    public ResponseEntity<?> cadastrar(Usuario admin) {
        Scan rm = new Scan();
        if (admin.getEmail().equals("")) {
            rm.mensagem("O email usuário é obrigatório");
            return new ResponseEntity<UsuarioRepositorio>((UsuarioRepositorio) rm, HttpStatus.BAD_REQUEST);
        } else if (admin.getCpf() == null) {
            rm.mensagem("O cpf é obrigatório");
            return new ResponseEntity<>(rm, HttpStatus.BAD_REQUEST);
        } else {
            return new ResponseEntity<>(usuarioRepositorio.save(admin), HttpStatus.CREATED);
        }
    }
}