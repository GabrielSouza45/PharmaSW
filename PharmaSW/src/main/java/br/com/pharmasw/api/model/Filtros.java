package br.com.pharmasw.api.model;

import br.com.pharmasw.api.model.enums.Grupo;
import br.com.pharmasw.api.model.enums.Status;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class Filtros {

    private Long id;
    private String nome;
    private Status status;
    private Grupo grupo;
    private int pagina;
}
