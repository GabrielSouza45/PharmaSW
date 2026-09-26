package br.com.pharmasw.api.model.dto;

import br.com.pharmasw.api.model.Cliente;
import br.com.pharmasw.api.model.enums.Genero;

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
