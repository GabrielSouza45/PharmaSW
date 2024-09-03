package br.com.pharmasw.api.modelo;

import br.com.pharmasw.api.modelo.enums.Grupo;
import br.com.pharmasw.api.modelo.enums.Status;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public record RetornoUsuarioDTO(
        Long id,
        String nome,
        String email,
        Long cpf,
        Grupo grupo,
        Status status,
        Date dataIni,
        Date dataAlt,
        Date dataFim
) {
    public RetornoUsuarioDTO(Usuario usuario) {
        this(usuario.getId(),
                usuario.getNome(),
                usuario.getEmail(),
                usuario.getCpf(),
                usuario.getGrupo(),
                usuario.getStatus(),
                usuario.getDataIni(),
                usuario.getDataAlt(),
                usuario.getDataFim()
        );
    }

}
