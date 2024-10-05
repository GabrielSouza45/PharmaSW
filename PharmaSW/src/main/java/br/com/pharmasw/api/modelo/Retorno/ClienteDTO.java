package br.com.pharmasw.api.modelo.Retorno;

import br.com.pharmasw.api.modelo.Cliente;
import br.com.pharmasw.api.modelo.enums.Genero;
import br.com.pharmasw.api.modelo.enums.Grupo;
import br.com.pharmasw.api.modelo.enums.Status;

import java.time.LocalDate;

public record ClienteDTO(
        Long id,
        String nome,
        String email,
        String cpf,
        Genero genero,
        LocalDate dataNascimento
) {
    public ClienteDTO(Cliente cliente){
        this(
                cliente.getId(),
                cliente.getNome(),
                cliente.getEmail(),
                cliente.getCpf(),
                cliente.getGenero(),
                cliente.getDataNascimento()
        );
    }
}
