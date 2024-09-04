package br.com.pharmasw.api.service;

import br.com.pharmasw.api.modelo.Retorno.RetornoUsuarioDTO;
import br.com.pharmasw.api.modelo.Usuario;
import br.com.pharmasw.api.modelo.enums.Status;
import br.com.pharmasw.api.repositorio.UsuarioRepositorio;
import br.com.pharmasw.api.service.helpers.DataHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class UsuarioServico {

    @Autowired
    private UsuarioRepositorio usuarioRepositorio;

    public List<Usuario> listarTodosUsuarios() {
        return usuarioRepositorio.findAll();
    }

    public List<Usuario> listarUsuariosAtivos() {
        return usuarioRepositorio.findAllByStatus(Status.ATIVO);
    }

    public List<Usuario> listarUsuariosInativos() {
        return usuarioRepositorio.findAllByStatus(Status.INATIVO);
    }



    //  CADASTRAR USUÁRIO
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
        RetornoUsuarioDTO usuarioDTO = new RetornoUsuarioDTO(usuarioSalvo);

        return new ResponseEntity<> (usuarioDTO, HttpStatus.OK);
    }



    //Desativando usuário
    public void desativarUsuario(Long id) {
        Optional<Usuario> usuario = usuarioRepositorio.findById(id);
        if (usuario.isPresent()) {
            Usuario user = usuario.get();
            user.setStatus(Status.INATIVO);
            usuarioRepositorio.save(user);
        }
    }

    //Ativando usuário
    public void ativarUsuario(Long id) {
        Optional<Usuario> usuario = usuarioRepositorio.findById(id);
        if (usuario.isPresent()) {
            Usuario user = usuario.get();
            user.setStatus(Status.ATIVO);
            usuarioRepositorio.save(user);
        }
    }

    //  ALTERAR USUÁRIO
    public ResponseEntity<?> alterar(Usuario usuarioRequest) {

        Usuario usuario =
                usuarioRepositorio.findUsuarioByEmailAndStatus(
                        usuarioRequest.getEmail(),
                        Status.ATIVO);

        String senhaEncriptada = "";
        if (usuarioRequest.getSenha() != null) {
            senhaEncriptada = new BCryptPasswordEncoder().encode(usuarioRequest.getSenha());
        }

        usuario.setNome(   usuarioRequest.getNome()  != null ? usuarioRequest.getNome()  : usuario.getNome());
        usuario.setCpf(    usuarioRequest.getCpf()   != null ? usuarioRequest.getCpf()   : usuario.getCpf());
        usuario.setSenha(  senhaEncriptada.isEmpty() ? usuario.getSenha() : senhaEncriptada);
        usuario.setDataAlt(DataHelper.getDataHora());

        Usuario retorno = usuarioRepositorio.save(usuario);

        return ResponseEntity.ok(retorno);

    }

    // Habilitar/Desabilitar usuário (Só para administradores)
    public ResponseEntity<?> alterarStatusUsuario(Usuario usuarioRequest) {

        Usuario usuario = usuarioRepositorio.findById(usuarioRequest.getId()).orElse(null);

        if (usuario == null) {
            return new ResponseEntity<>("Usuario não encontrado!", HttpStatus.NOT_FOUND);
        }

        Status status = usuario.getStatus();
        usuario.setStatus(status == Status.INATIVO ? Status.ATIVO : Status.INATIVO);
        usuario.setDataAlt(DataHelper.getDataHora());
        Usuario usuarioAtualizado = usuarioRepositorio.save(usuario);

        return new ResponseEntity<>(usuarioAtualizado, HttpStatus.OK);
        }

    }
