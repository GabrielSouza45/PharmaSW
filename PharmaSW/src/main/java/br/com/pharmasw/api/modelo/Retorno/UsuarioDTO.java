package br.com.pharmasw.api.modelo.Retorno;

import br.com.pharmasw.api.modelo.Usuario;
import br.com.pharmasw.api.modelo.enums.Grupo;
import br.com.pharmasw.api.modelo.enums.Status;


public record UsuarioDTO(
        Long id,
        String nome,
        String email,
        Long cpf,
        Grupo grupo,
        Status status
) {
    public UsuarioDTO(Usuario usuario) {
        this(usuario.getId(),
                usuario.getNome(),
                usuario.getEmail(),
                usuario.getCpf(),
                usuario.getGrupo(),
                usuario.getStatus()
        );
    }

}
