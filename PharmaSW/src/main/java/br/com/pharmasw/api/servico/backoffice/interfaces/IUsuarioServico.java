package br.com.pharmasw.api.servico.backoffice.interfaces;

import br.com.pharmasw.api.modelo.Filtros;
import br.com.pharmasw.api.modelo.Retorno.UsuarioDTO;
import br.com.pharmasw.api.modelo.Usuario;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface IUsuarioServico {

    public ResponseEntity<?> listarUsuarios(Filtros filtros);

    public ResponseEntity<?> cadastrar(Usuario usuario);

    public ResponseEntity<?> alterar(Usuario usuarioRequest);

    public ResponseEntity<?> alterarStatusUsuario(Usuario usuarioRequest);

    public List<UsuarioDTO> constroiRetornoUsuarioDTO(List<Usuario> usuarios);
}
