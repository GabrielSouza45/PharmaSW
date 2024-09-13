package br.com.pharmasw.api.servico;

import br.com.pharmasw.api.modelo.Filtros;
import br.com.pharmasw.api.modelo.Retorno.UsuarioDTO;
import br.com.pharmasw.api.modelo.Usuario;
import br.com.pharmasw.api.modelo.enums.Status;
import br.com.pharmasw.api.repositorio.UsuarioRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
public class UsuarioServico {

    @Autowired
    private UsuarioRepositorio usuarioRepositorio;

    public ResponseEntity<?> listarUsuarios(Filtros filtros) {
        List<Usuario> usuarios = usuarioRepositorio.getByNomeOrStatus(
                filtros.getNome(),
                filtros.getStatus() == null ? null : filtros.getStatus().toString()
        );

        return new ResponseEntity<>(constroiRetornoUsuarioDTO(usuarios), HttpStatus.OK);
    }


    //  CADASTRAR USUÁRIO
    public ResponseEntity<?> cadastrar(Usuario usuario) {

        // Verificar se o email já existe
        if (usuarioRepositorio.findUsuarioByEmailAndStatus(usuario.getEmail(), Status.ATIVO) != null) {
            return new ResponseEntity<>("Email já existe!", HttpStatus.UNAUTHORIZED);
        }

        // Verificar se o CPF já existe
        if (usuarioRepositorio.findByCpfAndStatus(usuario.getCpf(), Status.ATIVO) != null) {
            return new ResponseEntity<>("CPF já cadastrado!", HttpStatus.UNAUTHORIZED);
        }

        // Encriptar a senha
        usuario.setSenha(new BCryptPasswordEncoder().encode(usuario.getSenha()));

        // Definir o usuário como ativo
        usuario.setStatus(Status.ATIVO);

        // Salvar o usuário no banco de dados
        Usuario usuarioSalvo = usuarioRepositorio.save(usuario);
        UsuarioDTO usuarioDTO = new UsuarioDTO(usuarioSalvo);

        return new ResponseEntity<>(usuarioDTO, HttpStatus.CREATED);
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

        usuario.setNome(usuarioRequest.getNome() != null ? usuarioRequest.getNome() : usuario.getNome());
        usuario.setCpf(usuarioRequest.getCpf() != null ? usuarioRequest.getCpf() : usuario.getCpf());
        usuario.setSenha(senhaEncriptada.isEmpty() ? usuario.getSenha() : senhaEncriptada);

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
        Usuario usuarioAtualizado = usuarioRepositorio.save(usuario);

        return new ResponseEntity<>(new UsuarioDTO(usuarioAtualizado), HttpStatus.OK);
    }


    private List<UsuarioDTO> constroiRetornoUsuarioDTO(List<Usuario> usuarios) {

        List<UsuarioDTO> retorno = new ArrayList<>();

        if (usuarios.isEmpty()) {
            retorno.add(new UsuarioDTO(new Usuario()));
            return retorno;
        }

        for (Usuario usuario : usuarios) {
            retorno.add(new UsuarioDTO(usuario));
        }

        return retorno;
    }
}


