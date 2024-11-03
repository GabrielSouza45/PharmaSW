package br.com.pharmasw.api.servico.backoffice;

import br.com.pharmasw.api.modelo.Filtros;
import br.com.pharmasw.api.modelo.Retorno.UsuarioDTO;
import br.com.pharmasw.api.modelo.Usuario;
import br.com.pharmasw.api.modelo.enums.Status;
import br.com.pharmasw.api.repositorio.UsuarioRepositorio;
import br.com.pharmasw.api.servico.backoffice.helpers.PaginationHelper;
import br.com.pharmasw.api.servico.responseBuilder.ResponseBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
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
    @Autowired
    private PaginationHelper<UsuarioDTO> paginationHelper;

    public ResponseEntity<?> listarUsuarios(Filtros filtros) {
        int paginaAtual = filtros.getPagina() -1;

        List<Usuario> usuarios = usuarioRepositorio.findByNomeOrStatus(
                filtros.getNome(),
                filtros.getStatus() != null ? filtros.getStatus().toString() : null,
                paginationHelper.TAMANHO,
                paginationHelper.getOffet(paginaAtual)
        );

        Integer totalUsuarios = usuarioRepositorio.totalUsuarios(
                filtros.getNome(),
                filtros.getStatus() != null ? filtros.getStatus().toString() : null
        );

        List<UsuarioDTO> dtos = new ArrayList<>();
        usuarios.forEach(usuario -> {
            dtos.add(new UsuarioDTO(usuario));
        });

        Page<UsuarioDTO> page = paginationHelper.transformarEmPage(dtos, paginaAtual, totalUsuarios);

        return new ResponseBuilder().build(page, HttpStatus.OK);
    }


    //  CADASTRAR USUÁRIO
    public ResponseEntity<?> cadastrar(Usuario usuario) {

        // Verificar se o email já existe
        if (usuarioRepositorio.findUsuarioByEmailAndStatus(usuario.getEmail(), Status.ATIVO) != null) {
            return new ResponseBuilder().build("Email já existe!", HttpStatus.UNAUTHORIZED);
        }

        // Verificar se o CPF já existe
        if (usuarioRepositorio.findByCpfAndStatus(usuario.getCpf(), Status.ATIVO) != null) {
            return new ResponseBuilder().build("CPF já cadastrado!", HttpStatus.UNAUTHORIZED);
        }

        // Encriptar a senha
        usuario.setSenha(new BCryptPasswordEncoder().encode(usuario.getSenha()));

        // Definir o usuário como ativo
        usuario.setStatus(Status.ATIVO);

        // Salvar o usuário no banco de dados
        Usuario usuarioSalvo = usuarioRepositorio.save(usuario);
        UsuarioDTO usuarioDTO = new UsuarioDTO(usuarioSalvo);

        return new ResponseBuilder().build(usuarioDTO, HttpStatus.CREATED);
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
        usuario.setGrupo(usuarioRequest.getGrupo());
        Usuario retorno = usuarioRepositorio.save(usuario);

        return ResponseEntity.ok(retorno);

    }

    // Habilitar/Desabilitar usuário (Só para administradores)
    public ResponseEntity<?> alterarStatusUsuario(Usuario usuarioRequest) {

        Usuario usuario = usuarioRepositorio.findById(usuarioRequest.getId()).orElse(null);

        if (usuario == null) {
            return new ResponseBuilder().build("Usuario não encontrado!", HttpStatus.NOT_FOUND);
        }

        Status status = usuario.getStatus();

        usuario.setStatus(status == Status.INATIVO ? Status.ATIVO : Status.INATIVO);
        Usuario usuarioAtualizado = usuarioRepositorio.save(usuario);

        return new ResponseBuilder().build(new UsuarioDTO(usuarioAtualizado), HttpStatus.OK);
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


