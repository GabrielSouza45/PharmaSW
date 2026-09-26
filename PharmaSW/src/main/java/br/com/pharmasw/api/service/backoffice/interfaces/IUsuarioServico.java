package br.com.pharmasw.api.service.backoffice.interfaces;

import br.com.pharmasw.api.model.Filtros;
import br.com.pharmasw.api.model.Usuario;
import org.springframework.http.ResponseEntity;

public interface IUsuarioServico {

    public ResponseEntity<?> listarUsuarios(Filtros filtros);

    public ResponseEntity<?> cadastrar(Usuario usuario);

    public ResponseEntity<?> alterar(Usuario usuarioRequest);

    public ResponseEntity<?> alterarStatusUsuario(Usuario usuarioRequest);
}
